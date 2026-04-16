"""
Agentic AI Simulator: The ReAct Loop (Reasoning + Acting)
---------------------------------------------------------
This file demonstrates the exact secret behind how modern agents (ChatGPT, Gemini, Claude)
use external tools to solve problems autonomously!

Instead of just answering immediately, the Agent follows an execution loop:
1. THOUGHT: Given the user prompt, what should I do?
2. ACTION: I need to call a tool (e.g., calculator, weather API).
3. OBSERVATION: The tool returns the result.
4. THOUGHT: Now that I have the result, I can answer the user!
"""

import json
import re

# ---------------------------------------------------------
# 1. DEFINE OUR TOOLS (The Agent's Hands)
# ---------------------------------------------------------
def calculator(expression: str) -> str:
    """Evaluates a mathematical expression safely."""
    try:
        # In a real agent, use `ast.literal_eval` or a sandboxed math engine.
        result = eval(expression, {"__builtins__": {}})
        return str(result)
    except Exception as e:
        return f"Error calculating: {e}"

def get_weather(location: str) -> str:
    """Mock weather API."""
    mock_db = {
        "dhaka": "32°C and Humid",
        "london": "15°C and Rainy",
        "new york": "22°C and Sunny"
    }
    return mock_db.get(location.lower(), f"Weather data for {location} not available.")

# Tools registry mapping tool names to python functions
TOOLS = {
    "calculator": calculator,
    "get_weather": get_weather
}

# The JSON schema describing the tools to the LLM (This is exactly what OpenAI/Gemini APIs receive)
TOOLS_SCHEMA = [
    {
        "name": "calculator",
        "description": "Used to calculate math expressions.",
        "parameters": {"expression": "The mathematical equation as a string (e.g. '5 * 25')"}
    },
    {
        "name": "get_weather",
        "description": "Used to get the current weather for a city.",
        "parameters": {"location": "The name of the city (e.g. 'Dhaka')"}
    }
]

# ---------------------------------------------------------
# 2. MOCK THE LLM BRAIN (A simulated text generator)
# ---------------------------------------------------------
def simulated_llm_generation(prompt: str) -> str:
    """
    In the real world, this calls a Frontier model (like OpenAI API or your locally trained model).
    For educational purposes, we hardcode responses based on keyword matching to simulate 'Thought'.
    """
    prompt = prompt.lower()
    
    if "weather in dhaka" in prompt and "32°c" not in prompt:
        return "Thought: I need to check the weather in Dhaka.\nAction: get_weather\nAction Input: Dhaka"
        
    elif "32°c and humid" in prompt:
         return "Thought: I have the information.\nFinal Answer: The weather in Dhaka is currently 32°C and humid!"
         
    elif "calculate" in prompt and "500" not in prompt:
        return "Thought: The user is asking for a math calculation.\nAction: calculator\nAction Input: 125 * 4"
        
    elif "500" in prompt:
        return "Thought: I have the result.\nFinal Answer: The result of 125 multiplied by 4 is 500."
        
    else:
        return "Thought: I can answer this directly.\nFinal Answer: Hello! I am your Agentic AI assistant."

# ---------------------------------------------------------
# 3. THE ReAct AGENT LOOP (The Engine)
# ---------------------------------------------------------
class Agent:
    def __init__(self):
        self.system_prompt = f"""
        You are a smart Agentic AI. You have access to the following tools:
        {json.dumps(TOOLS_SCHEMA, indent=2)}
        
        Use the following format to solve tasks:
        Thought: describe your reasoning
        Action: the tool name
        Action Input: the input to the tool
        Observation: the result of the tool (do not generate this yourself)
        ... (repeat Thought/Action/Observation if needed)
        Thought: I know the final answer
        Final Answer: your response to the user
        """
        
    def run(self, user_query: str, max_iterations=5):
        print(f"\\n[USER] {user_query}")
        print("-" * 50)
        
        # The prompt memory grows with each step!
        current_context = f"{self.system_prompt}\\nUser: {user_query}\\n"
        
        for iteration in range(max_iterations):
            print(f"--- Iteration {iteration + 1} ---")
            
            # Step 1: LLM generates text based on accumulating context
            llm_response = simulated_llm_generation(current_context)
            print(f"\[LLM Generated\]:\\n{llm_response}\\n")
            
            current_context += llm_response + "\\n"
            
            # Step 2: Parse the response. Are we done?
            if "Final Answer:" in llm_response:
                answer = llm_response.split("Final Answer:")[-1].strip()
                print("==================================================")
                print(f"[AGENT FINAL RESPONSE] ✨ {answer}")
                print("==================================================")
                return answer
            
            # Step 3: If not done, extract the tool call (Action)
            action_match = re.search(r"Action:\s*(\w+)", llm_response)
            input_match = re.search(r"Action Input:\s*(.+)", llm_response)
            
            if action_match and input_match:
                tool_name = action_match.group(1).strip()
                tool_input = input_match.group(1).strip()
                
                print(f"🛠️  [EXECUTING TOOL] {tool_name}('{tool_input}')")
                
                # Step 4: Execute the actual python code tool!
                if tool_name in TOOLS:
                    observation = TOOLS[tool_name](tool_input)
                else:
                    observation = f"Error: Tool {tool_name} not found."
                    
                print(f"🔍 [OBSERVATION]: {observation}\\n")
                
                # Feed observation back into context so LLM can 'read' it
                current_context += f"Observation: {observation}\\n"
            else:
                print("Error: Model generated an invalid format.")
                break
                
        print("Agent failed to reach a conclusion within max iterations.")

# ---------------------------------------------------------
# Run Demo
# ---------------------------------------------------------
if __name__ == "__main__":
    agent = Agent()
    agent.run("What is the weather in Dhaka right now?")
    agent.run("Can you calculate 125 * 4 for me?")

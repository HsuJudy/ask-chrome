from flask import Flask, request, jsonify
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import openai
import os
app = Flask(__name__)
openai_api_key = os.getenv('OPENAI_API_KEY')

@app.route('/', methods=['POST'])
def ask():
    data = request.json
    user_question = data['question']

    # todo: get content from the webpage by ???
    webpage_content = data['content']
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
        # api_key="...",  # if you prefer to pass api key in directly instaed of using env vars
        # base_url="...",
        # organization="...",
        # other params...
    )

    messages = [
    (
        "system",
        "You are a helpful assistant answers questions based this context. {webpage_content}",
    ),
    ("human", "{user_question})"),
    ]

    prompt = ChatPromptTemplate.from_messages(messages)
    chain = prompt | llm
    response = chain.invoke({
        "webpage_content": webpage_content,  # "This is the content of the webpage.
        "user_question": user_question,}
    )

    print('user_question:', user_question)
    print('webpage_content:', webpage_content)
    return jsonify({'answer': response.content
    })

if __name__ == '__main__':
    app.run(debug=True)

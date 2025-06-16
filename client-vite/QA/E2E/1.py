import os
import asyncio
from dotenv import load_dotenv
from browser_use import Agent, Browser, BrowserConfig
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

async def main():
    browser = Browser(config=BrowserConfig())

    # 2.LLM — Google Gemini (через LangChain)
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0.0,
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    task = "\n".join([
        "1. Перейти на сайт http://localhost:1234/",
        "2. Переконатись що 5 героїв відображаються на сторінці",
        "3. Натиснути на картку 2 героя в списку",
        "4. Змінити нікнейм героя на 'NewHeroName' та зберегти зміни кнопкою апдейт",
        "5. Повернутись на головну за посиланням http://localhost:1234/",
        "6. Перевірити що нікнейм 2 в списку героя змінився",
        "7. Знову натиснути на картку 2 героя",
        "8. Натиснути кнопку видалити героя",
        "9. Повернутись на головну сторінку та перевірити що на першій сторінці більше немає 2 героя(але може з'явитись ніший дял пагінації)",
        "10. Перейти на 2 сторінку пагінації та переконатись що все працює"
    ])

    agent = Agent(
        task=task,
        llm=llm,
        browser=browser,
    )

    history = await agent.run()

    print("Успішно:", history.is_done())
    print("Результат:", history.final_result())
    print("Логи:")
    for line in history.model_thoughts():
        print("  ", line)

    await browser.close()
if __name__ == "__main__":
    asyncio.run(main())

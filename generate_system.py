import asyncio
import edge_tts
import os

os.makedirs("audio/sistem", exist_ok=True)

async def main():


    print("Mulai membuat audio...")

    communicate = edge_tts.Communicate(
        text="Hebat! Jawabanmu benar!",
        voice="id-ID-GadisNeural"
    )
    await communicate.save("audio/sistem/benar.mp3")

    print("benar.mp3 selesai")

    communicate = edge_tts.Communicate(
        text="Yah, jawabanmu masih salah.",
        voice="id-ID-GadisNeural"
    )

    await communicate.save("audio/sistem/salah.mp3")

    print("salah.mp3 selesai")


asyncio.run(main())

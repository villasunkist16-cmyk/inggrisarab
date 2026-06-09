import asyncio
import edge_tts
import os

OUTPUT_FOLDER = "audio/score"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

async def buat_audio(score):

    teks = f"Selamat! Permainan telah selesai. Skor kamu adalah {score}."

    output = os.path.join(
        OUTPUT_FOLDER,
        f"{score}.mp3"
    )

    communicate = edge_tts.Communicate(
        text=teks,
        voice="id-ID-GadisNeural"
    )

    await communicate.save(output)

    print("Selesai:", score)

async def main():

    for score in range(0, 50001, 500):

        await buat_audio(score)

asyncio.run(main())
import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFile } from 'fs/promises';

export const runtime = 'edge';

export const alt = 'Comdeck - A directory for AL commerce resources';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

async function getFont(fontPath: string) {
  const fontFile = await readFile(join(process.cwd(), fontPath));
  return fontFile;
}

export default async function Image() {
  const nunitoRegular = await getFont('app/fonts/nunito/nunito-v32-latin-regular.woff2');
  const nunitoBold = await getFont('app/fonts/nunito/nunito-v32-latin-700.woff2');
  const ppEditorialNewRegular = await getFont('app/fonts/pp-editorial-new/regular.woff2');

  // Using inline styles for ImageResponse as it supports a subset of CSS
  // Colors are hardcoded based on globals.css for simplicity in OG image generation
  const backgroundColor = 'oklch(0.10 0 0)'; // --background
  const foregroundColor = 'oklch(0.90 0 0)'; // --foreground
  const accentColor = 'oklch(0.55 0.15 250)'; // --accent

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: backgroundColor,
          color: foregroundColor,
          fontFamily: '"Nunito"',
          position: 'relative',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '80px',
            fontWeight: '700',
            fontFamily: '"PPEditorialNew"',
            marginBottom: '20px',
            lineHeight: '1',
          }}
        >
          Comdeck
        </div>
        <div
          style={{
            fontSize: '40px',
            fontFamily: '"Nunito"',
            color: foregroundColor,
            maxWidth: '900px',
            lineHeight: '1.2',
          }}
        >
          A directory for AL commerce resources
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            width: '80%',
            height: '5px',
            backgroundColor: accentColor,
            borderRadius: '5px',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Nunito',
          data: nunitoRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Nunito',
          data: nunitoBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'PPEditorialNew',
          data: ppEditorialNewRegular,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}

import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Comdeck - Open Graph Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
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
          backgroundColor: 'black',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p style={{ fontSize: 80, fontWeight: 'bold', margin: 0 }}>Comdeck</p>
        <p style={{ fontSize: 40, margin: '20px 0 0 0' }}>A directory for Advanced level commerce resources.</p>
      </div>
    ),
    {
      ...size,
    },
  );
}

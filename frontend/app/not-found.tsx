'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Coffee } from 'lucide-react';
import Image from 'next/image';

export default function NotFound() {
  useEffect(() => {
    // Throw some confetti because why not
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });
  }, []);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 space-y-6 bg-white h-full">
      <div className="flex flex-col items-center">
        <div className="w-[400px] h-[300px] relative mb-8 rounded-lg overflow-hidden">
          <Image
            src="/404.png"
            alt="404 Coffee Cup Character"
            fill
            style={{ objectFit: 'contain' }}
            priority
            className="rounded-lg"
          />
        </div>
        <div className="text-6xl font-mono mb-6 text-center">¯\_(ツ)_/¯</div>
        <p className="text-gray-600 text-lg text-center">
          our time was limited and the croissants were too delicious
        </p>
      </div>
    </div>
  );
}

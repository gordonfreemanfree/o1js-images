import React from 'react'
import DrawButton from './drawButton'
import DesignButton from './designButton'
import LikeButton from './likeButton'
import Image from 'next/image'

export default function ImageClass({ image, user, supabase, width, height }) {
  const CDNURL =
    'https://sbynnozaogsdzibhchva.supabase.co/storage/v1/object/public/user-images/'

  return (
    <div className="relative flex flex-wrap">
      <div className="w-full p-1 md:p-2 relative flex hover:opacity-100">
        <Image
          alt={image.name}
          width={width}
          height={height}
          //   className="object-center w-full h-full rounded-sm"
          className="object-center rounded-sm"
          src={CDNURL + user.id + '/' + image.name}
          loading="lazy"
          // click to open full size image in modal
          onClick={() => {
            window.open(CDNURL + user.id + '/' + image.name)
          }}
        />
        <LikeButton
          supabase={supabase}
          generatedImageNames={[image.name]}
          image_number={0}
          user={user}
        />
        <div className="absolute flex bottom-0 right-10">
          <DrawButton imageSrc={CDNURL + user.id + '/' + image.name} />
          <DesignButton imageSrc={CDNURL + user.id + '/' + image.name} />
        </div>
      </div>
    </div>
  )
}

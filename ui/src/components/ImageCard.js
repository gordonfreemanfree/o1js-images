import Image from 'next/image'

import randomImage100x100 from '../../public/assets/randomImage100x100.png'

const ImageCard = ({ image, user }) => {
  //   const tags = image.tags.split(',')
  return (
    <div classname="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        src={randomImage100x100}
        className="w-full"
        loading="lazy"
        alt={'test'}
        width={200}
        height={200}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-red-600 text-xl mb-2">Photo by {}</div>
        <ul>
          <li>
            <strong>Views: </strong>
            {/* {image.views} */}
          </li>
          <li>
            <strong>Downloads: </strong>
            {/* {image.downloads} */}
          </li>
          <li>
            <strong>Likes: </strong>
            {/* {image.likes} */}
          </li>
        </ul>
      </div>
      {/* <div className="px-6 py-4">
        {tags.map((tag, index) => (

          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div> */}
    </div>
  )
}

export default ImageCard

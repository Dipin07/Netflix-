import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { FileQuestion, Info, Play } from 'lucide-react'
import useGetTrendingContent from '../../components/hooks/useGetTrendingContent'
import { ORIGINAL_IMG_BASE_URL } from '../../components/utlis/constants'
import { MOVIE_CATEGORIES, TV_CATEGORIES, useContentStore } from '../../store/content'
import MovieSlider from '../../components/MovieSlider'

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent()
  const { contentType } = useContentStore()

  const [imageLoading, setImageLoading] = useState(true)

  // loading Spinner 
  if (!trendingContent) return (
    <div className="h-screen text-white relative">
      <Navbar />
      {/* shimmer */}
      <div className="shimmer absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10"></div>
    </div>
  )

  return (
    <>
      <div className='relative h-screen text-white '>
        <Navbar />

        {
          imageLoading && (
            <div className="shimmer absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10"></div>
          )
        }

        <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero-img"
          className='absolute top-0 left-0 w-full h-full object-cover -z-50'
          onLoad={() => {
            setImageLoading(false)
          }}
        />

        <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-40'
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 via-transparent">

          <div className="max-w-2xl">
            <h1 className='mt-4 text-6xl font-extrabold text-balance'>
              {/* title is for moves and name is for tv 
              shows */}
              {trendingContent?.title || trendingContent?.name}
            </h1>

            <p className='mt-2 text-lg'>
              {
                trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]
              } {" "}
              {trendingContent?.adult ? "18+" : "PG-13"}
            </p>

            <p className="mt-4 text-lg">
              {
                trendingContent?.overview.length > 200 ?
                  trendingContent?.overview.slice(0, 200) + "..." :
                  trendingContent?.overview
              }
            </p>
          </div>

          <div className="flex mt-8">
            <Link to={`/watch/${trendingContent?.id}`}
              className='bg-white hover:bg-white/80 p-3  rounded text-black font-bold py-2 mr-4 flex items-center'
            >
              <Play className='size-6 inline-block mr-2 fill-black ' />
              Play
            </Link>

            <Link to={`/watch/${trendingContent?.id}`}
              className='bg-gray-500/70 hover:bg-gray-500 p-3  rounded text-white font-bold py-2 flex items-center'
            >
              <Info className='size-6 inline-block mr-2 ' />
              More Info
            </Link>

          </div>

        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {
          contentType === 'movie' ? (
            MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
          ) : (
            TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
          )
        }
      </div>
    </>
  )
}


export default HomeScreen
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const AboutCarousel = () => {
    const images = [
      {
        original: "000.jpg",
        thumbnail: "000.jpg",
        description: ""
      },
      
      {
        original: "0.jpg",
        thumbnail: "0.jpg",
        description: ""
      },
      {
        original: "8.jpg",
        thumbnail: "8.jpg",
        originalHeight :"100%"
      },
      
      {
        original: "3.jpg",
        thumbnail: "3.jpg",
        originalHeight :"100%"
      },
      {
        original: "9.jpg",
        thumbnail: "9.jpg",
        originalHeight :"100%"
      },
      
      {
        original: "4.jpg",
        thumbnail: "4.jpg",
        originalHeight :"100%"
      },
      {
        original: "14.jpg",
        thumbnail: "14.jpg",
        originalHeight :"100%"
      },
      {
        original: "2.jpg",
        thumbnail: "2.jpg",
        description: ""
      },
      {
        original: "5.jpg",
        thumbnail: "5.jpg",
        originalHeight :"100%"
      },
      
      {
        original: "6.jpg",
        thumbnail: "6.jpg",
        originalHeight :"100%"
      },
      {
        original: "7.jpg",
        thumbnail: "7.jpg",
        originalHeight :"100%"
      },
      {
        original: "10.jpg",
        thumbnail: "10.jpg",
        originalHeight :"100%"
      },
      {
        original: "11.jpg",
        thumbnail: "11.jpg",
        originalHeight :"100%"
      },
      {
        original: "12.jpg",
        thumbnail: "12.jpg",
        originalHeight :"100%"
      },
      {
        original: "13.jpg",
        thumbnail: "13.jpg",
        originalHeight :"100%"
      },
      
      {
        original: "15.jpg",
        thumbnail: "15.jpg",
        originalHeight :"100%"
      },
      {
        original: "00.jpg",
        thumbnail: "00.jpg",
        description: ""
      },
    ];

    return (
      <ImageGallery
        items={images}
        showBullets={true}
        showIndex={false}
        showThumbnails={true}
        lazyLoad={false}
        showPlayButton={false}
        autoPlay={true}
        showFullscreenButton={false}
      />
    );
}

export default AboutCarousel

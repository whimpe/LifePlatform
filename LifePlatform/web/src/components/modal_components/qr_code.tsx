const {default:QRCodeStyling} = (await import('qr-code-styling'))

export const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        // iamge:"\public/img/logos/black_flower.svg",
        image:"/public/img/logos/black_flower.png",
        // https://aeternageneral.s3.eu-west-2.amazonaws.com/default_images/black_flower.svg",
        dotsOptions: {
          color: "#000",
          type: "dots"
        },
        cornersSquareOptions: { 
          type: "square"
        },
        cornersDotOptions: {
          type: "square"
        },
      
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0,
        }
      });   
    
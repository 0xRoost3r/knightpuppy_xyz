import './App.css';
import {useState } from 'react'
import { Stage, AnimatedSprite, Sprite, Container, useTick } from '@pixi/react';
import { isMobile } from 'react-device-detect';
import useWindowDimensions from './hook/useWindowDimensions';

const glassHeight = 125;
const glassPadding = 10;
const tickStep = 1.2;
const backgroundWidth = 2560;

const Cloud2 = () => {
  const size = useWindowDimensions();
  const screenSpacing = isMobile ? size.width : size.width / 2;
  const cloud2 = { width: 2560/8, height: 1162/8};  // cloud right
  const [x, setX] = useState(size.width);

  // custom ticker
  useTick(delta => {
    const newX = x - tickStep;
    if (newX < -screenSpacing) {
      setX(size.width + screenSpacing);
    } else {
      setX(newX);
    }

  });

  return (
    <Sprite y={size.height/9} x={x} height={cloud2.height} width={cloud2.width} image="/image/cloud.png" />
  );
};

const Cloud1 = () => {
  const size = useWindowDimensions();
  const screenSpacing = size.width / 2;
  const cloud2 = { width: 2560/12, height: 1162/12};  // cloud right
  const [x, setX] = useState(700);
  useTick(delta => {
    const newX = x - tickStep;

    if (newX < -screenSpacing) {
      setX(size.width + screenSpacing);
    } else {
      setX(newX);
    }

  });
  return (
    <>
      <Sprite y={size.height/9} x={x + 200} height={cloud2.height * 0.8} width={cloud2.width  * 0.8} image="/image/cloud.png" />
      <Sprite y={size.height/9} x={x} height={cloud2.height} width={cloud2.width} image="/image/cloud.png" />
    </>
  );
};


const Castle  = () => {
  const size = useWindowDimensions();
  const screenSpacing = isMobile ? size.width : size.width / 2;
  const castle = {width: 641/6, height: 1440/6};
  const tree2 = {width: 1109/10, height: 1440/10}; // tree left side
  const [x, setX] = useState(size.width * 1.5);

  // custom ticker
  useTick(delta => {
    const newX = x - tickStep;
    if (newX < -screenSpacing) {
      setX(size.width + screenSpacing);
    } else {
      setX(newX);
    }
  });

  return (
    <>
    <Sprite y={size.height - glassHeight - castle.height + glassPadding} height={castle.height} x={x} width={castle.width} image="/image/laudai2.png" />
    <Sprite y={size.height - glassHeight - tree2.height} x={castle.width + (tree2.width/4) + x} height={tree2.height} width={tree2.width} image="/image/tree2.png" />
    </>
  );
};

const MiniHouse  = () => {
  const size = useWindowDimensions();
  const screenSpacing = isMobile ? size.width : size.width / 2;
  const miniHouse = {width: 1490/10, height:1439/10}
  const tree1 = {width: 740/6, height: 1440/6}; // tree right side
  const [x, setX] = useState(0);

  // custom ticker
  useTick(delta => {
    const newX = x - tickStep;
    if (newX < -screenSpacing) {
      setX(size.width + screenSpacing);
    } else {
      setX(newX);
    }
  });

  return (
    <>
      <Sprite y={size.height - glassHeight - tree1.height + glassPadding} x={x} height={tree1.height} width={tree1.width} image="/image/tree1.png" />
      <Sprite y={size.height - glassHeight - miniHouse.height  + glassPadding} x={x + 100} height={miniHouse.height} width={miniHouse.width} image="/image/mini_house.png" />
    </>
  );
};

const Glass  = () => {
  const size = useWindowDimensions();
  const [x, setX] = useState(0);

  // custom ticker
  useTick(delta => {
    const newX = x - tickStep;
    if (newX + backgroundWidth < size.width) {
      setX(0);
    } else {
      setX(newX);
    }
  });

  return (
    <Sprite y={size.height - glassHeight} x={x} width={backgroundWidth} image="/image/glass2.png" />
  );
};

function App() {
  
  const size = useWindowDimensions();
  
  const doge = {width: 78, height: 77};

  return (
    <>
      <Stage width={size.width} height={size.height}  options={{backgroundAlpha: 0, antialias: true}}>
        <Sprite width={backgroundWidth} height={size.height} image="/image/background.png" />
        <Castle/>
        <MiniHouse  />        
        <Cloud1/>
        <Cloud2/>
        <Container position={[size.width / 2 , size.height  - glassHeight - (doge.height/2) + glassPadding]}>
          <AnimatedSprite
            width={doge.width}
            height={doge.height}
            anchor={0.5}
            images={['/image/puppy1.png', '/image/puppy2.png', '/image/puppy3.png', '/image/puppy4.png']}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.1}
          />
        </Container>
        <Glass />
      </Stage>
      <div className="center-tag-hero">
        <div className='tag-center'>
          <div className='hero-text'>KnightPuppy - Endless Journey!</div>
        </div>
      </div>
      <div className="center-tag">
        <div className='tag-block'>
          <div className='tag-header'><a href='https://doc.knightpuppy.xyz/knight-puppy-intro/barkleys-story' target='_blank'>STORY</a></div>
          <div className='tag-header'><a href='https://doc.knightpuppy.xyz' target='_blank'>DOC</a></div>
          <div className='tag-header'><a href='#' target='_blank'>GITHUB</a></div>
          <div className='tag-header'><a href='https://mirror.xyz/0xb75F3f37731cE57A95251d77bE4d7E63fe6fC6e7' target='_blank'>MIRROR</a></div>
        </div>
      </div>
      
    </>
    
  );
}

export default App;

import playPathTrimAnimation from './pathAnimation.js';
import loadSvg from './svgLoader.js';

// サイトの読み込みが完了したら、svgファイル読み込みとアニメーションの再生を行う
addEventListener('DOMContentLoaded', () => {
  const svgContainerElement = document.getElementById('main-image');
  const svgFilePath = svgContainerElement.getAttribute('data-path');
  loadSvg(svgContainerElement, svgFilePath).then((svgElement) => {
    playPathTrimAnimation(svgElement);
  });
});

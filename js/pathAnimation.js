// アニメーションの長さ（秒）
const baseAnimationDurationSec = 3.5;

/**
 * svgエレメントに含まれる全てのパスのトリミングアニメーションを行う
 * @param {SVGSVGElement} svgElement
 * @return
 */
export default function playPathTrimAnimation(svgElement) {
  const paths = svgElement.querySelectorAll('path');
  if (!paths) return;

  const pathLengthData = getPathLength(paths);

  paths.forEach((path, i) => {
    const length = pathLengthData.lengths[i] || 0;
    path.style.setProperty('--dash', length);

    // 長い線は少し長く、短い線は短めに（相対時間）
    const dur =
      (1.5 + baseAnimationDurationSec * (length / (pathLengthData.max || 1))).toFixed(2) + 's';
    path.style.setProperty('--dur', dur);

    // それぞれのパスを時間差で描画開始する。
    const delayScale = svgElement.parentElement.getAttribute('data-delay-scale') || 0.05;
    const baseDelayTime = svgElement.parentElement.getAttribute('data-base-delay') || 0;
    const delay = (i * delayScale).toFixed(2) + baseDelayTime + 's';

    path.style.animationDelay = delay;
  });
}

/**
 * それぞれのパスの長さと、最長のパスの長さを取得
 * @param {SVGPathElement} svgPaths - svgのpathエレメント
 * @returns {Object.<number[], number>}  パス長さの配列と最長の長さ
 */
function getPathLength(svgPaths) {
  let maxLength = 0;

  const lengths = Array.from(svgPaths).map((p) => {
    const pathLength = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 0;
    if (pathLength > maxLength) maxLength = pathLength;
    return pathLength;
  });

  return {
    lengths: lengths,
    max: maxLength,
  };
}

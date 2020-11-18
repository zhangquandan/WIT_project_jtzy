import store from '../store/index.js'

const colors = ['#226E4B', '#34A471', '#9ADFBF', '#BBEAD5', '#DDF4EA', '#FFFFFF', '#FDD1C5', '#FCA290',
  '#FD8376', '#FB5934', '#F81F02', '#CB1B03', '#961301', '#7A3129', '#000000'
]
/**
 * 获取数据对应的颜色
 */
export function getColor(data) {
  let scale = store.state.scale;
  for (let i = 0; i < scale.length; i++) {
    if (data < scale[i]) {
      return colors[i]
    }
  }
  return colors[colors.length - 1]
}

/**
 * 获取色卡颜色(visualMap)
 */
export function getColourAtla() {
  let scale = store.state.scale;
  var arr = []
  arr.push({
    lte: scale[0],
    color: colors[0]
  })
  for (let i = 1; i < scale.length; i++) {
    arr.push({
      gt: scale[i - 1],
      lte: scale[i],
      color: colors[i]
    })
  }
  return arr
}

export function getColorArr(){
  return colors
}


Page({
  data: {
    marker: [{
      id: 1001, longitude: 108.9186100000, latitude: 34.2255780000,  iconPath: '../images/location1.png',width:20,height:20,
      zIndex:10,
      anchor: { x: .5, y: 1 } ,
      callout: {
        content: '西安天洲电子科技有限公司',
        color: '#3684ff',
        fontSize: 15,
        borderRadius: 0,
        display: 'ALWAYS',
      }
    
    }],
    longitude: 108.9186100000, 
    latitude: 34.2255780000,
    scale:20,
    
  },

  onLoad: function () {
   
  },
})
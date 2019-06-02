<template>
    <div id="map-root-div">
        <div id="map-filter-div"></div>

        <div id="map-containt-div"></div>
    </div>
</template>

<script>

    import { getPointsByprjSN } from '../api/api';

    export default {
		data() {
			return {
				map: {}
			}
		},
		methods: {
            init() {
                this.map = new BMap.Map("map-containt-div");
                this.map.enableScrollWheelZoom();
                // this.map.setMapType(BMAP_HYBRID_MAP);//卫星&路网
            },
            drowBlock() {
                getPointsByprjSN({prjSN: this.prjSN}).then(resp => {


                    if (resp.header.rspReturnCode !== '000000') {
						this.$message({ message: '查询经纬度失败', type: 'error' });
						return;
					}

                    let points = resp.points;

                    for(let i = 0;i < points.length; i++){
                        let longlatVArray = points[i].longlatV.substring(0, points[i].longlatV.length - 1).split('|');
                        let psT = [];
                        for(var j = 0; j < longlatVArray.length; j++){
                            let p = longlatVArray[j].split(',');
                            
                            var mp = new BMap.Point(p[0], p[1]);
                            // 如果没有设置中心点 设置一个中心点
                            if (i === 0 && j === 0) {
                                this.map.centerAndZoom(mp, 16);
                            }
                            psT.push(mp);
                        }

                        this.map.addOverlay(new BMap.Polyline(psT, {
                            strokeColor : "red",  
                            strokeWeight : 3,  
                            strokeOpacity : 0.5  
                        })); // 画线 
                    }
                });
            }
        },
        mounted() {
            this.init();
            this.drowBlock();
            
        },
        props: ['prjSN']
	}
</script>

<style scoped lang="scss">
    #map-containt-div {
        width: 100%;
        height: 728px;
    }
</style>
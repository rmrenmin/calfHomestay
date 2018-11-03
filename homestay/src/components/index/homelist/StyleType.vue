<template>
<div class="styletype"> 
    <StyleTitle :title="styletype.title" :desc="styletype.desc"/>
    <HomeStyle :homelist="styletype.homelist"/>
</div>
</template>

<script>
import StyleTitle from './styletype/StyleTitle';
import HomeStyle from './styletype/HomeStyle';
	export default {
        name: 'StyleType',
        props:['styletype'],
		data() {
			return {
            
			}
        },
        components:{
            StyleTitle,
            HomeStyle,
        }
	}
</script>

<style scoped>
.styletype {
    margin: 20px 0;
}
</style>
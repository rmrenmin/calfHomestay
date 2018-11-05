<template>
	<div class="styleaside">
		<a href="https://www.mi.com/mix3/">
        <img :src="Img" alt="" srcset=""></a>
	</div>
</template>

<script>
import Img from '@/assets/indeximg/guanggao.jpg';
	export default {
		name: 'StyleAside',
		components:{

		},
		data() {
			return {
				Img,
			}
		},
	}
</script>

<style scoped>
img {
	height: 600px;
	border-radius: 6px;
}
img:hover {
	animation: gghover 0.5s;
    animation-fill-mode:forwards;
}
@keyframes gghover {
  100% {
    height: 620px;
	margin-top: -10px;
	border-radius: 12px;
  }
}


</style>
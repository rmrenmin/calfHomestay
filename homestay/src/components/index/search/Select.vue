<template>
<div class="block"> 
    <el-select v-model="select" class="inputbox" slot="prepend" :placeholder="name" @change="choose">
            <el-option  v-for="item in option" :key="item" :label="item" :value="item"></el-option>
    </el-select>
</div>
</template>

<script>
	export default {
        name: 'Select',
        props:['info','p','name','option'],
		data() {
			return {
             select: "",
			}
        },
        methods:{
           choose(){
               this.info[this.p]=this.select;
            //    console.log(this.info);
               this.$emit('getinfo',this.info);
           } 
        }
    }
</script>

<style scoped>

</style>
<template>
	<div class="container">
		<form ref="form2" enctype="multipart/form-data">
			<div class="head_btn">
				<span>基本信息</span>
			</div>
			<div class="row">
				<div class="col-md-4 col-xs-12">
					<span>承&nbsp;&nbsp;包&nbsp;&nbsp;商</span>
					<input type='text' class="input_s" name="contractor_name" v-model="contractor" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>项目名称</span>
					<input type='text' class="input_s" name="contract_name" v-model="contract" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>工程名称</span>
					<input type='text' class="input_s" name="engineer_name" v-model="engineer" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>评审时间</span>
					<input type='text' class="input_s form_datetime form-control" name="review_time" data-date-format="yyyy-mm-dd" id="review_time" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>进场时间</span>
					<input type='text' class="input_s form_datetime form-control" name="start_time"  data-date-format="yyyy-mm-dd" id="start_time" autocomplete="off">
				</div>
				<div class="col-md-4 col-xs-12">
					<span>完工时间</span>
					<input type='text' class="input_s form_datetime form-control" name="stop_time" id="stop_time"  data-date-format="yyyy-mm-dd" autocomplete="off">
				</div>
			</div>
			<div class="head_btn">
				<span>评定细则</span>
			</div>
			<div class="row">
				<div class="col-md-6 col-xs-12 li_content" v-for="(li,index) in lis">
					<div class="title">
						<p>{{li.icon}}{{li.title}}</p>
						<select :name="gernerateId(index)" @change="total_(index)" v-model="formModel[index].model">
					 	   <option>请选择分数</option>
					 	   <option v-for="fr in li.frac" :value="fr">{{fr}}</option>
					    </select>
					</div>
					<ul style="clear: both;">
						<li v-for="content in li.contents"> {{content.content_li}}<span>{{content.fraction}}分</span></li>
					</ul>
					<div>实际情况说明：<input type="text" :name="getinput(index)" class="explain"></div>
				</div>
				<div class="col-md-6 col-xs-12">
					<div class="careful">
						<ul>
							<li>注：1、实际情况说明一栏需要对实际情况进行说明；</li>
							<li> 2、分数以整数为计数单位，不可出现小数分值；</li>
							<li> 3、设备设施使用过程中造成人员伤亡等安全事故的，列入黑名单。</li>
						</ul>
					</div>
				</div>
				<div class="col-md-6 col-xs-12">
					<ul>
						<li>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;得&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分 <input type="text" class="input_s" name="total_score" v-model="total"></li>
						<li>评价人员签名<input type="text" class="input_s" name="autograph" v-model="autograph"></li>
					</ul>
				</div>
			</div>
			<div><button class="submit_btn" @click.prevent.stop="subajax">提交</button></div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'Inspec',
		data() {
			return {
				lis: [],
				contractor: '',
				contract: '',
				engineer: '',
				review: '',
				start: '',
				stop: '',
				autograph: '',
				total: '0',
				formModel: []
			}
		},
		created() {
			this.$nextTick(() => {
				this.getajax()
			})
		},
		methods: {
			gernerateId: function(index) {
				return "data[" + index + "][select_" + index + "]"
			},
			getinput: function(index) {
				return "data[" + index + "][input_" + index + "]"
			},
			total_: function(index) {
				let num = 0;
				this.formModel.forEach((value, index) => {
					console.log(this.formModel[index].model)
					if (this.formModel[index].model !== "") {
						num += Number(this.formModel[index].model);
					}
				})
				this.total = num
			},
			getajax: function() {
				this.$axios({
					method: 'get',
					url: 'static/lis2.json'
				}).then((response) => { //这里使用了ES6的语法
					console.log(response) //请求成功返回的数据
					this.lis = response.data
					this.lis.forEach((value, index) => {
						this.formModel.push({
							model: "0"
						})
					})
				}).catch((response) => {
					console.log(response) //请求失败返回的数据
				})
			},
			subajax: function() {
				//				if (!this.contractor||!this.contrantor||!this.engineer||!this.review||!this.start||!this.stop||!this.autograph) {
				//					alert("请完整输入基本信息和签名");
				//				} else {
				var formData = new FormData(this.$refs.form2); //获取表单数据
				console.log(formData);
				this.$axios.post('http://47.106.194.3/yigou/index.php?core-api-evaluate-serviceEvaluate', formData)
					.then(function(response) {
						console.log(response.data);
						if (response.data.statusCode == 200) {
							alert(response.data.message);
							 window.location.reload()
						}
					})
					.catch(function(error) {
						console.log(error);
						alert("提交失败，请重新提交")
					});
				//				}
			},
			dateDefind() {
				var d, s;
				var self = this;
				d = new Date();
				s = d.getFullYear() + "-"; //取年份
				s = s + (d.getMonth() + 1) + "-"; //取月份
				s += d.getDate() + " "; //取日期
				self.time = s;
				//初始化
				$('#stop_time').datetimepicker({
					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#start_time').datetimepicker({
					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
				$('#review_time').datetimepicker({
					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd',
					todayBtn: 1,
					autoclose: 1
				});
		
			}
		},
		mounted: function() {
			this.dateDefind();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.input_s {
		width: 250px!important;
		height: 34px;
	}
</style>
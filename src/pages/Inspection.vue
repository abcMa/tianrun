<template>
	<div class="container">
		<form ref="form1" enctype="multipart/form-data">
			<div class="head_btn">
				<span>基本信息</span>
			</div>
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<span>供&nbsp;&nbsp;&nbsp;&nbsp; 应&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商&nbsp;</span>
					<input type='text' class="input_s" name="supplier_name" v-model="supplier" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>合同名称</span>
					<input type='text' class="input_s" name="contract_name" v-model="contract" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>供货进场时间</span>
					<input type='text' class="input_s form_datetime form-control" name="purchase_time" v-model="purchase"  data-date-format="yyyy-mm-dd hh:ii" id="purchase_time" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>评审时间</span>
					<input type='text' class="input_s form_datetime form-control" name="review_time" v-model="review" data-date-format="yyyy-mm-dd hh:ii" id="review_time" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<select v-model="selected" @change="total_" style="border: solid 1px #000;">
					<option value="1">1</option>
					<option value="2">2</option>
				  </select>
				</div>
			</div>
			<div class="head_btn">
				<span>评定细则</span>
			</div>
			<div class="row">
				
				<div class="col-md-6 col-xs-12 li_content" v-for="(li,index) in lis">
					<div class="title">
						<p>{{li.icon}}{{li.title}}</p>
						<select :name="gernerateId(index)" >
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
					<ul style="margin-top: 20px;">
						<li>总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;得&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分 <input type="text" class="input_s" name="total_score" v-model="total"></li>
						<li>评价人员签名<input type="text" class="input_s" name="autograph"></li>
					</ul>
				</div>
			</div>
			<div><button class="submit_btn" @click.prevent.stop="subajax2">提交</button></div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'Inspec',
		data() {
			return {
				lis: [],
				supplier: '',
				contract: '',
				purchase: '',
				review: '',
				autograph: '',
				total: '0',
				selected:''
				
			}
		},
		created() {
			this.$nextTick(() => {
				this.getajax2()
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
				 this.total +=this.selected
			},
			getajax2: function() {
				this.$axios({
					method: 'get',
					url: './static/lis.json'
				}).then((response) => { //这里使用了ES6的语法
					console.log(response) //请求成功返回的数据
					this.lis = response.data
				}).catch((response) => {
					console.log(response) //请求失败返回的数据
				})
			},
			subajax2: function() {
				if (!this.supplier || !this.contract || !this.purchase || !this.review || !this.autograph) {
					alert("请完整输入基本信息和签名");
				} else {
					var formData = new FormData(this.$refs.form1); //获取表单数据
					console.log(formData);
					this.$axios.post('http://47.106.194.3/yigou/index.php?core-api-evaluate-goodsEvaluate', formData)
						.then(function(response) {
							console.log(response);
							if (response.data.statusCode == 200) {
								alert(response.data.message);
							}
						})
						.catch(function(error) {
							console.log(error);
							alert("提交失败，请重新提交")
						});
				}
			},
			dateDefind() {
				var d, s;
				var self = this;
				d = new Date();
				s = d.getFullYear() + "-"; //取年份
				s = s + (d.getMonth() + 1) + "-"; //取月份
				s += d.getDate() + " "; //取日期
				s += d.getHours() + ":"; //取小时
				s += d.getMinutes() + ":"; //取分
				s += d.getSeconds(); //取秒
				self.time = s;
				//初始化
				$('#purchase_time').datetimepicker({
					startDate: s,
					minView: "hour", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd hh:ii:ss',
					todayBtn: 1,
					autoclose: 1
				});
				$('#review_time').datetimepicker({
					startDate: s,
					minView: "hour", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd hh:ii:ss',
					todayBtn: 1,
					autoclose: 1
				});
				//当选择器隐藏时，讲选择框只赋值给data里面的time
				$('#messageSendTime').datetimepicker()
					.on('hide', function(ev) {
						var value = $("#messageSendTime").val();
						self.time = value;
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

</style>
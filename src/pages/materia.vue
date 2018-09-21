<template>
	<div class="container">
		<form ref="form3" enctype="multipart/form-data">
			<div class="head_btn">
				<span>基本信息</span>
			</div>
			<div class="row">
				<div class="col-md-6 col-xs-12">
					<span>供&nbsp;&nbsp;应&nbsp;&nbsp;商</span>
					<input type='text' class="input_s" name="supplier_name" v-model="supplier" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>合&nbsp;&nbsp;&nbsp;同&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;&nbsp;称</span>
					<input type='text' class="input_s" name="contract_name" v-model="contract" autocomplete="off">
				</div>

				<div class="col-md-6 col-xs-12">
					<span>评审时间</span>
					<input type='text' class="input_s form_datetime form-control" name="review_time"  data-date-format="yyyy-mm-dd hh:ii" id="review_time" autocomplete="off">
				</div>
				<div class="col-md-6 col-xs-12">
					<span>设备(材料)名称</span>
					<input type='text' class="input_s form_datetime form-control" name="engineer_name" v-model="engineer" autocomplete="off">
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
					 	   <option v-for="fr in li.frac" :value="fr">{{fr}}</option>
					    </select>
					</div>
					<ul style="clear: both;">
						<li v-for="content in li.contents"> {{content.content_li}}<span>{{content.fraction}}分</span></li>
					</ul>
					<div>实际情况说明：<input type="text" :name="getinput(index)" class="explain"></div>
				</div>
				<div class="col-md-6 col-xs-12 li_content">
					<div class="title">
						<p style="margin-bottom: 0px;">减分项</p>
					</div>
					<ul>
						<li><input name="subtraction[]" type="checkbox" value="0" v-model="checked1"/>按照巡视要求，在运行中发现一处因设备质量原因缺陷扣1分 </li>
						<li><input name="subtraction[]" type="checkbox" value="1" v-model="checked1"/>每发生一次紧急缺陷扣1分 </li>
						<li><input name="subtraction[]" type="checkbox" value="2" />发生一次跳闸扣3分 </li>
						<li><input name="subtraction[]" type="checkbox" value="3" />每发生操作维护故障、缺陷扣一分 </li>
						<li><input name="subtraction[]" type="checkbox" value="4" />一般性及交接每发生一项试验不合格扣三分 </li>
						<li><input name="subtraction[]" type="checkbox" value="5" />在诊断性试验中，发现一项不合格扣3分</li>
						<li><input name="subtraction[]" type="checkbox" value="6" />对于安全违章违纪行为，发现一项，扣除1分（若情况严重，人员列入黑名单，清除出场）。
现场运检作业过程中出现人员伤亡等安全事故的，列入黑名单。</li>
					</ul>
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
			<div><button class="submit_btn" @click.prevent.stop="subajax3">提交</button></div>
			
		</form>
	</div>
</template>

<script>
	export default {
		name: 'Mate',
		data() {
			return {
				lis: [],
				supplier: '',
				contract: '',
				purchase: '',
				engineer:'',
				autograph: '',
				total: '0',
				formModel: []
				
			}
		},
		created() {
			this.$nextTick(() => {
				this.getajax3()
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
			getajax3: function() {
				this.$axios({
					method: 'get',
					url: './static/lis3.json'
				}).then((response) => { //这里使用了ES6的语法
					console.log(response) //请求成功返回的数据
					this.lis = response.data;
					this.lis.forEach((value, index) => {
						this.formModel.push({
							model: "0"
						})
					})
				}).catch((response) => {
					console.log(response) //请求失败返回的数据
				})
			},
			subajax3: function() {
				//				if (!this.supplier || !this.contract || !this.purchase || !this.review || !this.autograph) {
				//					alert("请完整输入基本信息和签名");
				//				} else {
				var formData = new FormData(this.$refs.form3); //获取表单数据
				console.log(formData);
				this.$axios.post('http://47.106.194.3/yigou/index.php?core-api-evaluate-checkEvaluate', formData)
					.then(function(response) {
						console.log(response);
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
				s += d.getHours() + ":"; //取小时
				s += d.getMinutes() + ":"; //取分
				s += d.getSeconds(); //取秒
				self.time = s;
				//初始化
				$('#review_time').datetimepicker({
					startDate: s,
					minView: "2", //选择日期后，不会再跳转去选择时分秒
					language: 'zh-CN',
					format: 'yyyy-mm-dd hh:ii:ss',
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

</style>
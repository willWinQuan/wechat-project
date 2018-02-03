// pages/resume-index/creat-new-resume.js
var getaddress = require("address_data.js");
console.log(getaddress);


//获取省、市对应下的数据
function getcitys_areas(array,toarray,val_p){
    var new_array=[];
    for (var i = 0; i < array.length; i++) {
        if (array[i].parentid == toarray[val_p[0]].id) {
            new_array.push(array[i]);
        }
    }
    return new_array;
};

//获取省picker位置
function getaddresspickerindex(picker, value) {
    for (var i = 0; i < picker.length; i++) {
        if (picker[i].shortname== value) {
            return i;
        }
    }
};

//选择的省、城市、区展示
var addressprovince = "";
var addresscity = "";
var addresscounty = "";

//确定保存基础参数
var province_id="";
var city_id="";
var area_id="";

//请求城市、区数据参数
var address_id="";

//省id 用于第二次选择地址
var address_id_p="";

// 记忆位置
var val_p=[0];
var val_city=[0];
var val_county=[0];


//防止多次点击
var tabflag=false;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        addressvalue: '',
        hiddenmask: true,
        hiddendetamask:true,
        provinces: [],
        addressprovince: "",
        all_citys:'',
        all_countys:'',
        citys: [],
        addresscity: "",
        countys: [],
        addresscounty: "",
        pickershow: "-580rpx",
        toastHidden: true,
        toastcontent: "",
        swipercurrent:"0",
        provincesvalue:[0],
        citysvalue:[0],
        countysvalue:[0],
        begin_year:'',
        begin_month:'',
        begin_addressprovince:'',
        begin_addresscity:'',
        begin_addresscounty:'',
        begin_province_id:'',
        begin_city_id:'',//避免picker出现后，不做任何操作就关闭造成city_id为空
        begin_area_id:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that=this;

      var provinces = getaddress.address_data.data.province;
      var all_citys = getaddress.address_data.data.city;
      var all_countys = getaddress.address_data.data.area;
      var citys = getcitys_areas(all_citys, provinces, val_p);
      var countys = getcitys_areas(all_countys, all_citys, val_city);    

      that.setData({
          provinces: provinces,
          all_citys: all_citys,
          all_countys: all_countys,
          citys: citys,
          countys: countys
        })    
    },
    bindaddressChange:function(e){
        // console.log(e);
        var that=this;
        var value=e.detail.value;

        val_p[0]=value[0];
        val_city[0]=value[1];
        val_county[0]=value[2];

        var citys = [];
        var countys = [];
        var provinces_data = that.data.provinces;
        var citys_data = that.data.all_citys;
        var areas_data = that.data.all_countys;
        
        citys = getcitys_areas(citys_data, provinces_data, val_p);
        that.setData({
            citys: citys
        })
        
        if(citys.length==0){
            that.setData({
                countys:citys
            })
            return;
        }
        setTimeout(function(){
            citys_data = that.data.citys;  
            countys = getcitys_areas(areas_data, citys_data, val_city);
            that.setData({
                countys: countys
            })

        },250)
                
    },
    sureaddress:function(){
        var that=this;
        var provinces_data = that.data.provinces;
        var citys_data = that.data.citys;
        var areas_data = that.data.countys; 

        province_id = provinces_data[val_p[0]].id;

        if (citys_data.length==0){
           city_id='无';
           citys_data=[
               {
                   shortname:'无',
                   id:''  
               }
           ];
           that.setData({
               citys: citys_data
           })
        }else{
            city_id = citys_data[val_city[0]].id;
        }
        
        if (areas_data.length==0){
            area_id = '无';
            areas_data = [
                {
                    shortname: '无',
                    id:''
                }
            ];
            that.setData({
                countys: areas_data
            })
        }else{
            area_id = areas_data[val_county[0]].id; 
        }   

        that.setData({
            addressprovince: provinces_data[val_p[0]].shortname,
            addresscity: citys_data[val_city[0]].shortname,
            addresscounty: areas_data[val_county[0]].shortname,
            hiddenmask: true,
            pickershow: "-580rpx"
        })
       
    },
    toastChange: function () {
        var that=this;
        that.setData({
            toastHidden: true
        })
    },

    canceladdress:function(){
        var that=this;
        that.setData({
            hiddenmask: true,
            pickershow: "-580rpx"
        })
    },
    tabchooseaddress: function () {
        var that=this;
        var citys = [];
        var countys = [];
        var provinces_data = that.data.provinces;
        var citys_data = that.data.all_citys;
        var areas_data = that.data.all_countys;
        var province = that.data.addressprovince;
        var addresscity = that.data.addresscity;
        var addresscounty = that.data.addresscounty;   
                
        var provincesvalue_index = getaddresspickerindex(that.data.provinces,province);
       
        if (provincesvalue_index) {

            val_p[0] = provincesvalue_index;
            citys = getcitys_areas(citys_data, provinces_data, val_p);
            that.setData({
                citys: citys
            }) 

            province_id = provinces_data[val_p[0]].id;
            var citysvalue_index = getaddresspickerindex(that.data.citys, addresscity);
            val_city[0] = citysvalue_index;
            citys_data = that.data.citys;
            if (citys_data.length == 0) {
                city_id = '无';
                citys_data = [
                    {
                        shortname: '无',
                        id: '无'
                    }
                ];
                that.setData({
                    citys: citys_data
                })
            }else{
                city_id = citys_data[val_city[0]].id;
            } 
    
            if (city_id!='无'){
                countys = getcitys_areas(areas_data, citys_data, val_city);
                that.setData({
                    countys: countys
                })
            }else{
                that.setData({
                    countys: []
                })
            }

     
            var countyvalue_index = getaddresspickerindex(that.data.countys, addresscounty);
            val_county[0] = countyvalue_index;
            areas_data = that.data.countys;
            if (areas_data.length == 0) {
                area_id = '无';
                areas_data = [
                    {
                        shortname: '无',
                        id: '无'
                    }
                ];
                that.setData({
                    countys: areas_data
                })
            } else {
                area_id = areas_data[val_county[0]].id;
            }  
        }
        
        if (!val_city[0]){
            val_city[0]=0;
        }
        if (!val_county[0]){
            val_county[0]=0; 
        }

        that.setData({
            swipercurrent: "0",
            pickershow: '0rpx',
            hiddenmask: false,
            addressvalue: [val_p[0], val_city[0], val_county[0]]
        })

    },

    bindmask:function(){
        var that=this;

        if (city_id==''){//没有操作picker
            city_id = that.data.begin_city_id;
            area_id = that.data.begin_area_id;
        }
        that.setData({
            hiddenmask:true,
            pickershow:"-580rpx"
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */

})
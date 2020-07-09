import React, { useState } from 'react';
import { View, Text, Dimensions, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'


function editKontak(props) {
    const [fullname,setFullName] = useState("")
    const [tanggal,setTanggal] = useState("")
    const [jenisKelamin,setjenisKelamin] = useState("kosong")
    const [pendidikan,setPendidikan] = useState("")


    const { height, width } = Dimensions.get("window");
    return (
    <View style={{padding:15, flex:1, backgroundColor:'#F8F8F8', marginTop:height*0.02}}>

        <DatePicker
            style={{width:'90%', alignSelf:'center', backgroundColor:'white', marginBottom:height*0.02}}
            date={tanggal}
            mode="date"
            placeholder="Tanggal lahir"
            format="DD-MM-YYYY"
            maxDate="31-08-2020"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                marginLeft: 36, borderRadius:10, height:50
            },
            // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {setTanggal(date)}}
        />

        <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'90%', alignSelf:'center', marginBottom:height*0.01, borderRadius:10, height:height*0.055}}>
            <Picker
                selectedValue={jenisKelamin}
                onValueChange={(itemValue, itemIndex) => setjenisKelamin(itemValue)}
                style={{justifyContent:'center', alignItems:'center', }}
            >   
                    <Picker.Item label={"Pilih Jenis Kelamin"} value={"kosong"} />
                    <Picker.Item label={"Laki-Laki"} value={"Laki-Laki"} />
                    <Picker.Item label={"Perempuan"} value={"Perempuan"} />
            </Picker>
        </View>

        <View style={{borderWidth:1, borderColor:'gray', justifyContent:'center', width:'90%', alignSelf:'center', marginBottom:height*0.01, borderRadius:10, height:height*0.055}}>
            <Picker
                selectedValue={pendidikan}
                onValueChange={(itemValue, itemIndex) => setPendidikan(itemValue)}
                style={{justifyContent:'center', alignItems:'center', }}
            >   
                    <Picker.Item label={"Pilih Pendidikan"} value={"kosong"} />
                    <Picker.Item label={"SMP"} value={"SMP"} />
                    <Picker.Item label={"SMA"} value={"SMA"} />
                    <Picker.Item label={"Kuliah"} value={"Kuliah"} />
            </Picker>
        </View>


    </View>
    );
}

export default editKontak;
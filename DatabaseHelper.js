import SQLite from "react-native-sqlite-storage";

export const db = SQLite.openDatabase({
    name: 'sekolah',
    location: 'default'
},
() => {
    console.log("Database connected!")
}, //on success
error => console.log("Database error", error) //on error
)

export const saveSiswa = (firstName,lastName,phoneNum,gender,jenjang,hobi,alamat) => {
    let sql = "INSERT INTO siswa (first_name, last_name, phone_num,gender,jenjang,hobi,alamat) VALUES (?, ?,?,?,?,?,?)";
      let params = [firstName,lastName,phoneNum,gender,jenjang,JSON.stringify(hobi),alamat]; //storing user data in an array
      db.executeSql(sql, params, (result) => {
          alert("Success", "Siswa created successfully.");
      }, (error) => {
          console.log("Create user error", error);
      });
}

export const getSiswaByName = async(nama,setData) => {
    let sql = `SELECT * FROM siswa WHERE first_name LIKE '%${nama}%' OR last_name LIKE '%${nama}%'`;
      await db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultSet) => {
          var length = resultSet.rows.length;
          var data = [];
          for (var i = 0; i < length; i++) {
            data.push(resultSet.rows.item(i));
            // setHobi(JSON.parse(resultSet.rows.item(i).hobi));
          }
          setData(data);
        }, (error) => {
          console.log("List user error", error);
        })
      })
  }

export const updateSiswa = (firstName,lastName,phoneNum,gender,jenjang,hobi,alamat,id) => {
  let sql = "UPDATE siswa SET first_name = ?, last_name = ?, phone_num = ?, gender = ?, jenjang = ?, hobi = ?, alamat = ? WHERE id = ?";
  let params = [firstName,lastName,phoneNum,gender,jenjang,JSON.stringify(hobi),alamat,id]; //storing user data in an array
    db.executeSql(sql, params, (result) => {
        alert("Success", "Siswa updated successfully");
    }, (error) => {
        console.log("Create user error", error);
    });
}

export const deleteSiswa = ({navigation},id) => {
  let sql = "DELETE FROM siswa WHERE id = ?";
     db.executeSql(sql, [id], (result) => {
        alert("Success siswa dihapus");
    }, (error) => {
        console.log("delete user error", error);
    });
    // setAngka((prev) => prev + 1)k
    setContext(context+3);
    navigation.navigate('Home')

}

 export const listUsers = async (setData) => {
    try {
      let sql = "SELECT * FROM siswa";
      await db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultSet) => {
          var length = resultSet.rows.length;
          var newData = [];
          for (var i = 0; i < length; i++) {
            newData.push(resultSet.rows.item(i));
          }
          setData(newData)
        }, (error) => {
          console.log("List user error", error);
        })
      })
    } catch (error) {
      console.log(error);
    }
  }
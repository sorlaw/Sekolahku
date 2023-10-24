export const createSiswa = () => {
    let sql = "INSERT INTO users (email, name) VALUES (?, ?)";
    let params = ["yoursocialmd@gmail.com", "MD Sarfaraj"]; //storing user data in an array
    db.executeSql(sql, params, (result) => {
        Alert.alert("Success", "User created successfully.");
    }, (error) => {
        console.log("Create user error", error);
    });
}
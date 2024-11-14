const axios = require('axios');

const smsFunc = {}

smsFunc.sendSMS = async (mobile, otp) => {
    try {
        let data = JSON.stringify({
            "msgCategory": "4.5",
            "contentType": "3.1",
            "senderAddr": "TDOUAEDXB24",
            "dndCategory": "Campaign",
            "priority": 1,
            "recipient": mobile,
            "msg": `Dear Agent your Login, Identity verification, Reset Password OTP for verification is ${otp} from TDO DXB, valid for 10 minutes`,
            "dr": "1"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://smartmessaging.etisalat.ae:5676/campaigns/submissions/sms/nb',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE2MTYsImxvZ2luSWQiOiJTaGFpbGVuZGFyX3RlY2giLCJmaXJzdE5hbWUiOiJTaGFpbGVuZGFyIiwiZW1haWwiOiJzaGFsaW5kZXJAdm1tZWR1Y2F0aW9uLmNvbSIsInN0YXR1cyI6IjEiLCJjb250YWN0Tm8iOiI5MTk4NTU0NDc0ODciLCJwYXJlbnRJZCI6MTE1MjIsImNsYWltcyI6IntcInJvbGVcIjpcIjE3XCIsXCJwZXJtc1wiOntcIjhcIjpcImNyXCIsXCI5XCI6XCJyXCIsXCIxMFwiOlwiclwiLFwiMTRcIjpcImNyZWRcIixcIjE1XCI6XCJyblwiLFwiMThcIjpcImNyZWRcIixcIjE5XCI6XCJyXCIsXCIyMFwiOlwiclwiLFwiMjFcIjpcInJcIixcIjI2XCI6XCJyXCIsXCIzMFwiOlwiY3JlZHRcIixcIjIzLjFcIjpcImNyZWRcIixcIjIzLjJcIjpcImNyZWRcIixcIjkuMy44XCI6XCJyXCIsXCI5LjMuMTFcIjpcInJcIixcIjkuMy4xMlwiOlwiclwiLFwiOS4zLjEzXCI6XCJyXCIsXCI5LjMuNVwiOlwiclwiLFwiOS4zLjZcIjpcInJcIixcIjkuMy43XCI6XCJyXCIsXCI5LjMuMTRcIjpcInJcIixcIjkuMy4xNVwiOlwiclwiLFwiOS4zLjE3XCI6XCJyXCIsXCI5LjMuMThcIjpcInJcIixcIjkuMy4yMFwiOlwiclwiLFwiOS4zLjIxXCI6XCJyXCIsXCI5LjMuMjJcIjpcInJcIixcIjkuMy4xOVwiOlwiclwiLFwiOS4zLjI1XCI6XCJyXCIsXCI5LjMuMjZcIjpcInJcIixcIjkuMy4yN1wiOlwiclwiLFwiMjMuM1wiOlwiY3JlZHRcIixcIjIuOVwiOlwiY3JlZFwiLFwiMTUuMVwiOlwicm5cIixcIjE1LjRcIjpcInJuXCIsXCIxNS4xMVwiOlwicm5cIixcIjE1LjEyXCI6XCJyblwiLFwiMTUuMTRcIjpcInJuXCIsXCIxNS4xNlwiOlwicm5cIixcIjE1LjI0XCI6XCJyblwiLFwiMTUuMjVcIjpcInJuXCIsXCIxNS4yNlwiOlwicm5cIixcIjE1LjI3XCI6XCJyblwiLFwiMTUuMzVcIjpcInJuXCIsXCIxNS40MFwiOlwicm5cIixcIjE1LjMwXCI6XCJyblwiLFwiMTUuNDNcIjpcInJuXCIsXCIxNS4yOVwiOlwicm5cIixcIjUuMVwiOlwiY3JlZHRcIixcIjUuMlwiOlwiY3JlZHRcIixcIjUuM1wiOlwiY3JlZHRcIixcIjUuNFwiOlwiY3JlZHRcIixcIjUuNVwiOlwiY3JlZHRcIixcIjUuN1wiOlwiY3JlZHRcIixcIjguMS4xXCI6XCJjcmVkdFwiLFwiOC4zXCI6XCJjcmVkdFwiLFwiOC4zLjFcIjpcImNyZWR0XCIsXCIyLjFcIjpcImNyZWR0XCJ9fSIsImNyZWF0ZWRBdCI6IjIwMjQtMDgtMDVUMTE6Mzc6NDUuMDAwWiIsImV4cGlyeUR0IjoiMjAzNC0wNy0xMVQyMDowMDowMC4wMDBaIiwiZW50ZXJwcmlzZUlkIjoiNTI2NiIsImlhdCI6MTcyMzYxNDQzOH0.91OC7n7c2HcO52shq1UTa9UlWqTDN_tlMLnnfRQ7iLo',
                'Cookie': 'TS01214ac1=018c9c821b042b4dd48216e0b503185cf6a6436777b19825c9a3602028bb288a6e5d6f9e1d36a258742c2452fd048b3b7e247a3426'
            },
            data : data
        };

        // axios.request(config)
        //     .then((response) => {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        let resp = await axios.request(config)
        // console.log(resp.data)
        const {statusCode} = resp.data
        if  (statusCode === 201) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

module.exports = smsFunc
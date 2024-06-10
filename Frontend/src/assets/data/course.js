import React from 'react'
import axios from '../../components/axiosCreds.js'


export const course = await axios.get('/course/view')
    .then((res) => {
        JSON.stringify(res.data);
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    });

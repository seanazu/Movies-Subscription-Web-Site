import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import MoviesUtils from '../Utils/MoviesUtils';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';

const AddNewMovieComp = (props) => {
    const[movies,setMovies] = useState([])
    const[moviesOption , setOptions] = useState([])
    const[selectedMovie , setSelection] = useState("")

    useEffect(async()=>{
        let movies = await MoviesUtils.getAllMovies()
        setMovies(movies)
        let optionArray = []
        movies.map(item=>{
            optionArray.push({label :item.name , value:item._id})
        })
        setOptions(optionArray)

        let subscribers = await SubscriptionsUtils.getAllSubscriptions()
        

    },[])

    const current = new Date()
    let date =`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}` 

    const subscribeMovie = async() => {
        let subscriptions = await SubscriptionsUtils.getAllSubscriptions() 
        let subscription = await subscriptions.filter(item => item._id == props.id)
        console.log(subscription)
        if(subscription[0]){
            let newMovies = subscription[0].movies
            newMovies.push({
                movieId:selectedMovie ,
                date: date
            })
            let obj = {
                _id : props.id ,
                movies : newMovies
            }
            let resp1= await SubscriptionsUtils.putSubscription(props.id, obj)
            console.log(resp1);

        }else{
            let obj = {
                _id:props.id , 
                movies : [
                    {
                        movieId: selectedMovie , 
                        date: date
                    }
                ]
            }
            let resp = await SubscriptionsUtils.postSubscription(obj)
            console.log(resp);
            props.render()
        }

    }


    return (
        <div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            <table border="3" style={{margin:'auto',height:"150px", width:"250px"}}>
                <tbody border="3" style={{height:"70px", width:"150px",margin:'auto',fontSize:'small'}}>
                    <tr>
                        <td>
                            <span>Add A New Movie </span>
                            <div style={{width:'100px',margin:'auto'}}>
                                <Select options={moviesOption} onChange={(opt)=>setSelection(opt.value)}/>
                                Current Date:<input type="text" value={date} style={{width:'100px'}} />
                                <br/>
                                <input type="button" value="Subscribe" onClick={subscribeMovie} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AddNewMovieComp;
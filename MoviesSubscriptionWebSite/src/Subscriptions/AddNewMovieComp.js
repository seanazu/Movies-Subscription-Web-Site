import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import MoviesUtils from '../Utils/MoviesUtils';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        margin:'auto',
        height:"150px", 
        width:"250px"
      },
    tableBody :{
        height:"70px", 
        width:"150px",
        margin:'auto',
        fontSize:'small'
    },
    selectMovie : {
        width:'100px',
        margin:'auto'
    }
});

const AddNewMovieComp = (props) => {
    const classes = useStyles()
    const[movies,setMovies] = useState([])
    const[moviesOption , setOptions] = useState([])
    const[selectedMovie , setSelection] = useState("")

    useEffect(async()=>{
        const movies = await MoviesUtils.getAllMovies()
        setMovies(movies)
        let optionArray = []
        movies.map(item=>{
            optionArray.push({label :item.name , value:item._id})
        })
        setOptions(optionArray)

    },[])

    const current = new Date()
    let date =`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}` 

    const subscribeMovie = async() => {
        const subscriptions = await SubscriptionsUtils.getAllSubscriptions() 
        let subscription = subscriptions.filter(item => item._id == props.id)
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
             await SubscriptionsUtils.putSubscription(props.id, obj)

        }else{
            const obj = {
                _id:props.id , 
                movies : [
                    {
                        movieId: selectedMovie , 
                        date: date
                    }
                ]
            }
            const resp = await SubscriptionsUtils.postSubscription(obj)
            console.log(resp);
            props.render()
        }

    }


    return (
        <div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            <table border="3" className={classes.root} >
                <tbody border="3" className={classes.tableBody} >
                    <tr>
                        <td>
                            <span>Add A New Movie </span>
                            <div className={classes.selectMovie} >
                                <Select options={moviesOption} onChange={(opt)=>setSelection(opt.value)}/>
                                Current Date:<input type="text" value={date}  />
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

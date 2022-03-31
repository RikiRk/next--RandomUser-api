/* eslint-disable @next/next/no-img-element */

import {useRouter} from 'next/router'
import { GetStaticProps } from "next";



export const getStaticProps: GetStaticProps = async(context)=>{
    const Url = "https://randomuser.me/api"
    const resu = await fetch(Url);
    let data = await resu.json();
    data = data.results
    console.log(data)
    return {
        props: {
            data,
        },
    };

};


function Item({data}: any) {
    const router = useRouter()
    
    return(
         <>
       {data &&
        data.map((d:any, i:any) => {
          let info = {
            cell: d.cell,
            dob: d.dob.date,
            email: d.email,
            city: d.location.city,
            country: d.location.country,
            state: d.location.state,
            name: d.name.title + " " + d.name.first + " " + d.name.last,
            picture: d.picture.large,
            username: d.login.username,
        };
            return (
            <div key={d.dob.date}>
              {/* <div>{d.name.title + " " + d.name.first + " " + d.name.last}</div> */}
            <h1 className="title"> Random User Generator</h1>
            <div className="user-profile">
                <img alt="avatar" src={d.picture.large} />
                <div id="fullname">
                {d.name.title + " " + d.name.first + " " + d.name.last}
                </div>
                <div id="username">{d.login.username}</div>
                <div className="description">
                <div>
                    Email: <span id="email">{d.email}</span>
                </div>
                <div>
                    City: <span id="city">{d.location.city}</span>
                </div>
                <div>
                    DoB:<span id="dob">{d.dob.date}</span>
                </div>
                </div>
                <div className="footer">
                <button id="btn" onClick={() => router.reload()}>
                    Next User!
                </button>
                </div>
            </div>
            </div>
        );
        })}
    </>
  );
}
export default Item;
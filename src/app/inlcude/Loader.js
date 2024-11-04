import TimerComponent from "./TimerComponent";
import styles from "./safar.module.css";
export default function Loader() {
 
  return (
    <>
  <div className="text-center l-loading">
  <svg className="circlespinner" viewBox="0 0 50 50">
    <circle
      className="path"
      cx={25}
      cy={25}
      r={20}
      fill="none"
      strokeWidth={5}
    />
  </svg>
  <h1
    style={{
      fontSize: 14,
      color: "rgb(33, 33, 33)",
      fontFamily: "Heebo, sans-serif"
    }}
  >
    Verifying details...
    <br />
    <br />
    <span id="loadCont">
      <TimerComponent time={9} />
    </span>
  </h1>
</div>


</>
  );
}

import BillingTable from "../components/BillingTable";
import PremiumBanner from "../components/PremiumBanner";
import CancelPremium from "../components/CancelPremium";

export default function Billing(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-6">
      <PremiumBanner server={props.server} />
      {props.billing.length ? (
        <BillingTable billing={props.billing} />
      ) : (
        <div className="flex flex-row items-center justify-center">
          <p className="font-medium bold text-3xl text-white text-opacity-80">No billing logs</p>
        </div>
      )}
      {props.server.premium && <CancelPremium server={props.server} />}
    </div>
  );
}

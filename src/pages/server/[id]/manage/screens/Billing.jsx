import BillingTable from "../components/BillingTable";
import PremiumBanner from "../components/PremiumBanner";
import CancelPremium from "../components/CancelPremium";

export default function Billing(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-6">
      <PremiumBanner server={props.server} />
      {props.billing.length ? (
        <BillingTable billing={props.billing} />
      ) : (
        <div className="flex flex-row items-center justify-center">
          <p className="bold text-3xl font-medium text-white text-opacity-80">
            No billing logs
          </p>
        </div>
      )}
      {props.server.premium && <CancelPremium server={props.server} />}
    </div>
  );
}

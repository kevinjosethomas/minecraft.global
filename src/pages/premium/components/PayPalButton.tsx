import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  CreateSubscriptionActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js/types/components/buttons";

type PayPalButtonProps = {
  onComplete: CallableFunction;
};

function PayPalButton(props: PayPalButtonProps): JSX.Element {
  return (
    <PayPalButtons
      style={{ layout: "vertical", shape: "rect", color: "blue", label: "subscribe" }}
      createSubscription={(data: Record<string, unknown>, actions: CreateSubscriptionActions) => {
        return actions.subscription.create({
          plan_id: process.env.NEXT_PUBLIC_PAYPAL_PLAN_ID as string,
        });
      }}
      onApprove={(data: OnApproveData, actions: OnApproveActions) => {
        return new Promise(async (resolve, reject) => {
          try {
            await props.onComplete(data, actions);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      }}
    />
  );
}

export default PayPalButton;

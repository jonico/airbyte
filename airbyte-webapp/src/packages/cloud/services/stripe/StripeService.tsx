import { useMemo } from "react";
import {
  StripeCheckoutSessionCreate,
  StripeCheckoutSessionRead,
  StripeService,
} from "packages/cloud/lib/domain/stripe";

import { useDefaultRequestMiddlewares } from "services/useDefaultRequestMiddlewares";
import { useConfig } from "packages/cloud/services/config";
import { useMutation } from "react-query";

export function useStripeService(): StripeService {
  const requestAuthMiddleware = useDefaultRequestMiddlewares();
  const { cloudApiUrl } = useConfig();

  return useMemo(() => new StripeService(cloudApiUrl, requestAuthMiddleware), [
    cloudApiUrl,
    requestAuthMiddleware,
  ]);
}

export function useStripeCheckout(
  onSuccess: (session: StripeCheckoutSessionRead) => void
) {
  const service = useStripeService();
  return useMutation(
    (params: StripeCheckoutSessionCreate) =>
      service.createCheckoutSession(params),
    { onSuccess }
  );
}

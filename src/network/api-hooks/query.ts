import kyClient from "@/lib/ky-client";
import {
  ApiFilter,
  CartData,
  CartItemTotal,
  DestinationData,
  HttpResponse,
  ProductData,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";

async function getProducts(
  slug: string,
  filter?: ApiFilter,
): Promise<HttpResponse<ProductData>> {
  try {
    const res = await kyClient
      .get<
        HttpResponse<ProductData>
      >(`products/${slug}`, { searchParams: filter !== null && typeof filter === "object" ? filter : {} })
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useProductsQuery(slug: string, filter?: ApiFilter) {
  return useQuery<HttpResponse<ProductData>>({
    queryKey: ["products", slug, JSON.stringify(filter)],
    queryFn: () => getProducts(slug, filter),
    enabled: () => {
      if (!slug) return false;
      if (filter !== null && typeof filter === "object") {
        if (filter?.day || filter?.dataplan) {
          return true;
        }
      }
      return false;
    },
  });
}

async function getDestinations(
  filter?: string,
): Promise<HttpResponse<DestinationData>> {
  try {
    const params: { [key: string]: string } = {};
    if (filter) {
      params["destination"] = filter;
    }
    const res = await kyClient
      .get<
        HttpResponse<DestinationData>
      >("destinations", { searchParams: params })
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useDestinationsQuery(filter?: ApiFilter) {
  return useQuery<HttpResponse<DestinationData>>({
    queryKey: ["destinations", filter],
    queryFn: ({ queryKey }) => getDestinations(queryKey[1] as string),
    enabled: filter !== null,
  });
}

async function getCartItemTotal(): Promise<HttpResponse<CartItemTotal>> {
  try {
    const res = await kyClient
      .get<HttpResponse<CartItemTotal>>("cart/total")
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useCartItemTotalQuery() {
  return useQuery<HttpResponse<CartItemTotal>>({
    queryKey: ["carts", "total"],
    queryFn: getCartItemTotal,
  });
}

async function getCartItems(): Promise<HttpResponse<CartData>> {
  try {
    const res = await kyClient.get<HttpResponse<CartData>>("carts").json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useCartItemsQuery() {
  return useQuery<HttpResponse<CartData>>({
    queryKey: ["carts"],
    queryFn: getCartItems,
  });
}

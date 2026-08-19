// Shared telco network definitions used by the Airtime and Data top-up flows.

export type NetworkId = "mtn" | "airtel" | "glo" | "9mobile";

export type Network = {
  id: NetworkId;
  name: string;
};

export const NETWORKS: Network[] = [
  { id: "mtn", name: "MTN" },
  { id: "airtel", name: "Airtel" },
  { id: "glo", name: "Glo" },
  { id: "9mobile", name: "9mobile" },
];

export function getNetwork(id: NetworkId | null | undefined): Network | undefined {
  if (!id) return undefined;
  return NETWORKS.find((n) => n.id === id);
}

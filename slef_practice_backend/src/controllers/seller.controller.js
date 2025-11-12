import { User } from "../models/user.model";

export async function allProductsWithDetails(req, res) {}

export async function topBuyedProducts(req, res) {}

export async function topBuyedPeoples(req, res) {}

export async function totalFilter(req, res) {
  const logginUser = req.user;
  const sellerDetails = User.findById(logginUser.id);

  const finalResponceData = {};
}

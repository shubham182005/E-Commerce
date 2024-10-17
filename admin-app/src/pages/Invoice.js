import React from 'react'

const Invoice = () => {
  return (
    <div>
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <div className="invoice-title">
            <h4 className="float-end font-size-15">Invoice #DS0204 <span className="badge bg-success font-size-12 ms-2">Paid</span></h4>
            <div className="mb-4">
              <h2 className="mb-1 text-muted">Bootdey.com</h2>
            </div>
            <div className="text-muted">
              <p className="mb-1">3184 Spruce Drive Pittsburgh, PA 15201</p>
              <p className="mb-1"><i className="uil uil-envelope-alt me-1" /> xyz@987.com</p>
              <p><i className="uil uil-phone me-1" /> 012-345-6789</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-sm-6">
              <div className="text-muted">
                <h5 className="font-size-16 mb-3">Billed To:</h5>
                <h5 className="font-size-15 mb-2">Preston Miller</h5>
                <p className="mb-1">4068 Post Avenue Newfolden, MN 56738</p>
                <p className="mb-1">PrestonMiller@armyspy.com</p>
                <p>001-234-5678</p>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-6">
              <div className="text-muted text-sm-end">
                <div>
                  <h5 className="font-size-15 mb-1">Invoice No:</h5>
                  <p>#DZ0112</p>
                </div>
                <div className="mt-4">
                  <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                  <p>12 Oct, 2020</p>
                </div>
                <div className="mt-4">
                  <h5 className="font-size-15 mb-1">Order No:</h5>
                  <p>#1123456</p>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="py-2">
            <h5 className="font-size-15">Order Summary</h5>
            <div className="table-responsive">
              <table className="table align-middle table-nowrap table-centered mb-0">
                <thead>
                  <tr>
                    <th style={{width: 70}}>No.</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-end" style={{width: 120}}>Total</th>
                  </tr>
                </thead>{/* end thead */}
                <tbody>
                  <tr>
                    <th scope="row">01</th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14 mb-1">Black Strap A012</h5>
                        <p className="text-muted mb-0">Watch, Black</p>
                      </div>
                    </td>
                    <td>$ 245.50</td>
                    <td>1</td>
                    <td className="text-end">$ 245.50</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row">02</th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14 mb-1">Stainless Steel S010</h5>
                        <p className="text-muted mb-0">Watch, Gold</p>
                      </div>
                    </td>
                    <td>$ 245.50</td>
                    <td>2</td>
                    <td className="text-end">$491.00</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="text-end">Sub Total</th>
                    <td className="text-end">$732.50</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">
                      Discount :</th>
                    <td className="border-0 text-end">- $25.50</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">
                      Shipping Charge :</th>
                    <td className="border-0 text-end">$20.00</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">
                      Tax</th>
                    <td className="border-0 text-end">$12.00</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">Total</th>
                    <td className="border-0 text-end"><h4 className="m-0 fw-semibold">$739.00</h4></td>
                  </tr>
                  {/* end tr */}
                </tbody>{/* end tbody */}
              </table>{/* end table */}
            </div>{/* end table responsive */}
            <div className="d-print-none mt-4">
              <div className="float-end">
                <a href="javascript:window.print()" className="btn btn-success me-1"><i className="fa fa-print" /></a>
                <a href="#" className="btn btn-primary w-md">Send</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>{/* end col */}
  </div>
</div>

    </div>
  )
}

export default Invoice

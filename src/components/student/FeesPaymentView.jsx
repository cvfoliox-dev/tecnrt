import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { STUDENT_FEES, COLLEGE_INFO } from '../../data/mockData';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  ShieldCheck, 
  Printer, 
  X, 
  AlertCircle, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

export default function FeesPaymentView() {
  const { currentUser, showToast, logAction } = useAuth();
  const student = currentUser.profile || {};
  const [feeData, setFeeData] = useState(STUDENT_FEES[student.rollNumber] || STUDENT_FEES["21TML0501"]);

  // Multi-step Payment Workflow Modal (PRD Section 10)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Category, 2: Info & CAPTCHA, 3: External Gateway Simulator, 4: Result & Receipt
  const [selectedFeeItem, setSelectedFeeItem] = useState(feeData.items.find(i => i.status === 'Pending') || feeData.items[1]);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaCorrect, setCaptchaCorrect] = useState(false);
  const [phoneInput, setPhoneInput] = useState(student.phone || '+91 98480 12345');
  const [emailInput, setEmailInput] = useState(student.email || '21tml0501@tecnrt.org');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);
  const [viewReceiptModal, setViewReceiptModal] = useState(null);

  const openPaymentFlow = (item) => {
    setSelectedFeeItem(item);
    setStep(1);
    setCaptchaAnswer('');
    setPaymentModalOpen(true);
  };

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2ProceedToGateway = (e) => {
    e.preventDefault();
    if (captchaAnswer.trim() !== '14') {
      showToast("Incorrect CAPTCHA answer. Please enter the sum of 8 + 6 = 14.", "error");
      return;
    }
    // Step 5: Proceed to external payment provider simulator
    setStep(3);
  };

  const handleCompleteGatewayPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const newTxn = {
        refId: `TXN-TMLN-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        category: selectedFeeItem.name,
        amount: selectedFeeItem.amount,
        gateway: "SBI Collect / Tirumala Campus Pay",
        mode: paymentMethod,
        status: "Success",
        receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };

      // Update fee state
      setFeeData(prev => {
        const updatedItems = prev.items.map(item => {
          if (item.id === selectedFeeItem.id) {
            return { ...item, paid: item.amount, status: 'Paid' };
          }
          return item;
        });
        const newPaid = prev.paidAmount + selectedFeeItem.amount;
        const newDue = Math.max(0, prev.dueAmount - selectedFeeItem.amount);
        return {
          ...prev,
          paidAmount: newPaid,
          dueAmount: newDue,
          items: updatedItems,
          transactions: [newTxn, ...prev.transactions]
        };
      });

      logAction({
        action: "FEE_PAYMENT_SUCCESS",
        details: `Paid ₹${selectedFeeItem.amount} for ${selectedFeeItem.name} via ${paymentMethod}`,
        affectedClass: student.rollNumber
      });

      setCompletedTxn(newTxn);
      setStep(4);
      showToast(`Fee payment of ₹${selectedFeeItem.amount} successful!`, "success");
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Dues Summary Cards */}
      <div className="grid-3">
        <div className="card" style={{ borderLeft: '4px solid #1d4ed8' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Annual Obligation
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            ₹{feeData.totalAnnualFee.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Academic Year {feeData.academicYear} • B.Tech Regular
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Fees Paid
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            ₹{feeData.paidAmount.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#047857' }}>
            <CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Receipts cleared and reconciled
          </div>
        </div>

        <div className="card" style={{ borderLeft: feeData.dueAmount === 0 ? '4px solid #10b981' : '4px solid #f59e0b' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Current Pending Dues
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: feeData.dueAmount === 0 ? '#059669' : '#d97706', fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>
            ₹{feeData.dueAmount.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {feeData.dueAmount === 0 ? "No pending fees for current term" : "Payment Due: October 30, 2026"}
          </div>
        </div>
      </div>

      {/* PRD Section 10 Architecture Callout */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.82rem', color: '#1e40af' }}>
        <ShieldCheck size={22} style={{ color: '#2563eb', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>PRD Section 10 Payment Compliance:</strong> The portal preserves the college's existing verified payment workflow (SBI Collect / Campus Pay). Credit card credentials are never collected or stored directly on the portal. Receipts are cryptographically verified upon server-side confirmation.
        </div>
      </div>

      {/* Fee Items Table */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={18} style={{ color: '#2563eb' }} />
          Fee Category Breakdown & Obligations
        </h3>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Fee Category</th>
                <th>Total Fee</th>
                <th>Amount Paid</th>
                <th>Balance Due</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feeData.items.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>₹{item.amount.toLocaleString()}</td>
                  <td><span style={{ color: '#059669', fontWeight: 600 }}>₹{item.paid.toLocaleString()}</span></td>
                  <td>
                    <span style={{ color: item.amount - item.paid > 0 ? '#d97706' : '#64748b', fontWeight: 700 }}>
                      ₹{(item.amount - item.paid).toLocaleString()}
                    </span>
                  </td>
                  <td>{item.dueDate}</td>
                  <td>
                    <span className={`badge ${item.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === 'Paid' ? (
                      <span style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 600 }}>Cleared</span>
                    ) : (
                      <button 
                        onClick={() => openPaymentFlow(item)}
                        className="btn btn-accent btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History & Receipts */}
      <div className="card">
        <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={18} style={{ color: '#059669' }} />
          Payment Transactions & Electronic Receipts
        </h3>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction Ref</th>
                <th>Date & Time</th>
                <th>Fee Category</th>
                <th>Amount Paid</th>
                <th>Payment Mode</th>
                <th>Receipt No</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {feeData.transactions.map((tx, idx) => (
                <tr key={idx}>
                  <td><strong style={{ color: '#1d4ed8' }}>{tx.refId}</strong></td>
                  <td>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td><strong style={{ color: '#059669' }}>₹{tx.amount.toLocaleString()}</strong></td>
                  <td>{tx.mode}</td>
                  <td>{tx.receiptNo}</td>
                  <td><span className="badge badge-success">{tx.status}</span></td>
                  <td>
                    <button 
                      onClick={() => setViewReceiptModal(tx)}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    >
                      <Download size={12} /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRD Section 10 Multi-Step Payment Workflow Modal */}
      {paymentModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header" style={{ background: '#0e2154', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                  Institutional Payment Gateway (PRD Section 10)
                </h3>
              </div>
              <button onClick={() => setPaymentModalOpen(false)} style={{ background: 'none', border: 'none', color: '#cbd5e1' }}>
                <X size={20} />
              </button>
            </div>

            {/* Stepper Progress */}
            <div style={{ display: 'flex', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '0.65rem 1rem', fontSize: '0.75rem', justifyContent: 'space-around' }}>
              <span style={{ fontWeight: step >= 1 ? 700 : 500, color: step >= 1 ? '#1d4ed8' : '#94a3b8' }}>1. Select Fee</span>
              <span>→</span>
              <span style={{ fontWeight: step >= 2 ? 700 : 500, color: step >= 2 ? '#1d4ed8' : '#94a3b8' }}>2. Verification</span>
              <span>→</span>
              <span style={{ fontWeight: step >= 3 ? 700 : 500, color: step >= 3 ? '#1d4ed8' : '#94a3b8' }}>3. Gateway</span>
              <span>→</span>
              <span style={{ fontWeight: step >= 4 ? 700 : 500, color: step >= 4 ? '#059669' : '#94a3b8' }}>4. Receipt</span>
            </div>

            {/* Step 1: Fee Category Selection */}
            {step === 1 && (
              <div>
                <div className="modal-body">
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                    Confirm Fee Category & Amount
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Select the pending fee item you wish to clear through the institutional payment portal.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {feeData.items.filter(i => i.status === 'Pending').map(item => (
                      <label 
                        key={item.id} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          padding: '0.85rem', 
                          borderRadius: '8px', 
                          border: selectedFeeItem?.id === item.id ? '2px solid #2563eb' : '1px solid #e2e8f0', 
                          background: selectedFeeItem?.id === item.id ? '#eff6ff' : '#ffffff',
                          cursor: 'pointer' 
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input 
                            type="radio" 
                            name="feeSelect" 
                            checked={selectedFeeItem?.id === item.id}
                            onChange={() => setSelectedFeeItem(item)}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{item.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Due Date: {item.dueDate}</div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1d4ed8' }}>
                          ₹{item.amount.toLocaleString()}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button onClick={() => setPaymentModalOpen(false)} className="btn btn-outline">Cancel</button>
                  <button onClick={handleStep1Next} className="btn btn-primary">
                    Proceed to Verification <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Verification, Phone/Email, CAPTCHA (PRD 10.1 Steps 2, 3, 4) */}
            {step === 2 && (
              <form onSubmit={handleStep2ProceedToGateway}>
                <div className="modal-body">
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                    Student Information & Security Verification
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Per PRD Section 10.1, enter your contact information for transaction receipt dispatch and solve the verification challenge.
                  </p>

                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.82rem' }}>
                    <div>Selected Fee: <strong>{selectedFeeItem?.name}</strong></div>
                    <div>Total Amount: <strong style={{ color: '#059669', fontSize: '0.95rem' }}>₹{selectedFeeItem?.amount.toLocaleString()}</strong></div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Phone Number (For SMS Receipt)</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        required 
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email (For Digital Invoice)</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        required 
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* PRD Step 3: CAPTCHA Verification */}
                  <div className="form-group">
                    <label className="form-label">Security CAPTCHA Challenge *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ background: '#e2e8f0', color: '#0e2154', padding: '0.6rem 1rem', borderRadius: '6px', fontWeight: 800, letterSpacing: '0.1em', userSelect: 'none' }}>
                        8 + 6 = ?
                      </div>
                      <input 
                        type="number" 
                        className="form-input" 
                        required 
                        placeholder="Enter sum"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        style={{ maxWidth: '140px' }}
                      />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Prevents automated payment requests.
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setStep(1)} className="btn btn-outline">Back</button>
                  <button type="submit" className="btn btn-accent">
                    Proceed to Payment Gateway <ExternalLink size={15} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: External Gateway Simulator (PRD 10.1 Steps 5, 6) */}
            {step === 3 && (
              <div className="modal-body" style={{ padding: '1.75rem', textAlign: 'center' }}>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Connected External Provider:</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0e2154' }}>SBI Collect / Tirumala Campus Pay Gateway</div>
                  <div style={{ fontSize: '0.8rem', color: '#1d4ed8', marginTop: '0.2rem' }}>
                    Order Amount: ₹{selectedFeeItem?.amount.toLocaleString()}
                  </div>
                </div>

                <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Select Test Payment Method
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <button 
                    onClick={() => setPaymentMethod('UPI')}
                    style={{ padding: '0.85rem', borderRadius: '8px', border: paymentMethod === 'UPI' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: paymentMethod === 'UPI' ? '#eff6ff' : '#ffffff', cursor: 'pointer' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>UPI / QR</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>GPay, PhonePe</div>
                  </button>

                  <button 
                    onClick={() => setPaymentMethod('Net Banking')}
                    style={{ padding: '0.85rem', borderRadius: '8px', border: paymentMethod === 'Net Banking' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: paymentMethod === 'Net Banking' ? '#eff6ff' : '#ffffff', cursor: 'pointer' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Net Banking</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>SBI, HDFC, ICICI</div>
                  </button>

                  <button 
                    onClick={() => setPaymentMethod('Debit Card')}
                    style={{ padding: '0.85rem', borderRadius: '8px', border: paymentMethod === 'Debit Card' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: paymentMethod === 'Debit Card' ? '#eff6ff' : '#ffffff', cursor: 'pointer' }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Debit Card</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>RuPay, Visa</div>
                  </button>
                </div>

                <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #a7f3d0', fontSize: '0.8rem', color: '#065f46', marginBottom: '1.5rem' }}>
                  Testing Simulator: Click Authorize Payment to simulate immediate bank authorization & webhook confirmation.
                </div>

                <button 
                  onClick={handleCompleteGatewayPayment}
                  disabled={processing}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  {processing ? "Authorizing with Bank..." : `Authorize Payment of ₹${selectedFeeItem?.amount.toLocaleString()}`}
                </button>
              </div>
            )}

            {/* Step 4: Result & Invoice (PRD 10.1 Steps 7, 8) */}
            {step === 4 && completedTxn && (
              <div>
                <div className="modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#065f46', marginBottom: '0.35rem' }}>
                    Payment Confirmed!
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    Transaction Reference: <strong>{completedTxn.refId}</strong>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'left', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Fee Category:</span>
                      <strong>{completedTxn.category}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Amount Paid:</span>
                      <strong style={{ color: '#059669' }}>₹{completedTxn.amount.toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Receipt Number:</span>
                      <strong>{completedTxn.receiptNo}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>SMS Notification Sent to:</span>
                      <span>{phoneInput}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button onClick={() => setPaymentModalOpen(false)} className="btn btn-outline">Close</button>
                  <button 
                    onClick={() => { setPaymentModalOpen(false); setViewReceiptModal(completedTxn); }} 
                    className="btn btn-primary"
                  >
                    <Printer size={15} /> View Official Receipt
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Official Receipt Printable Dialog */}
      {viewReceiptModal && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} style={{ color: '#059669' }} />
                <h3 style={{ fontSize: '1.1rem' }}>Electronic Fee Receipt</h3>
              </div>
              <button onClick={() => setViewReceiptModal(null)} style={{ background: 'none', border: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '2rem' }}>
              <div style={{ border: '2px solid #0e2154', padding: '1.5rem', borderRadius: '10px', background: '#ffffff' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0e2154' }}>
                    TIRUMALA ENGINEERING COLLEGE
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Jonnalagadda, Narasaraopet, Palnadu Dist, AP - 522601 (Code: TMLN)
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1d4ed8', marginTop: '0.2rem' }}>
                    STUDENT FEE PAYMENT RECEIPT
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                  <div>Receipt No: <strong>{viewReceiptModal.receiptNo}</strong></div>
                  <div>Date: <strong>{viewReceiptModal.date}</strong></div>
                  <div>Student Name: <strong>{student.name}</strong></div>
                  <div>Roll Number: <strong>{student.rollNumber}</strong></div>
                  <div>Branch & Year: <strong>{student.department} ({student.year})</strong></div>
                  <div>Payment Mode: <strong>{viewReceiptModal.mode}</strong></div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{viewReceiptModal.category}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Ref: {viewReceiptModal.refId}</div>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
                    ₹{viewReceiptModal.amount.toLocaleString()}
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid #cbd5e1', paddingTop: '0.75rem' }}>
                  <div>Accounts Officer / Cashier</div>
                  <div style={{ fontWeight: 700, color: '#0e2154' }}>Tirumala Engineering College</div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setViewReceiptModal(null)} className="btn btn-outline">Close</button>
              <button onClick={() => window.print()} className="btn btn-primary">
                <Printer size={16} /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

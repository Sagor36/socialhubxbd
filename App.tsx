import React, { useState, useEffect } from 'react';
import { Service, Order, PaymentRequest } from './types';
import { DEFAULT_SERVICES, SUPPORT_NUMBER } from './constants';

import ServiceList from './components/ServiceList';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import OrderForm from './components/OrderForm';
import PaymentForm from './components/PaymentForm';
import UserOrders from './components/UserOrders';

// ===============================
// TELEGRAM BOT SETTINGS
// ===============================

const BOT_TOKEN = '8853917367:AAHxCiPdcNVzzI4vjgWH9WzjQCDNXDnGWFg';
const CHAT_ID = '7002010324';

// ===============================
// APP
// ===============================

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [view, setView] = useState<
    'home' | 'admin' | 'my-orders' | 'pay'
  >('home');

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    const savedServices =
      localStorage.getItem('sxh_services');

    const savedOrders =
      localStorage.getItem('sxh_orders');

    const savedPayments =
      localStorage.getItem('sxh_payments');

    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      setServices(DEFAULT_SERVICES);

      localStorage.setItem(
        'sxh_services',
        JSON.stringify(DEFAULT_SERVICES)
      );
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
  }, []);

  // ===============================
  // SAVE SERVICES
  // ===============================

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem(
        'sxh_services',
        JSON.stringify(services)
      );
    }
  }, [services]);

  // ===============================
  // SAVE ORDERS
  // ===============================

  useEffect(() => {
    localStorage.setItem(
      'sxh_orders',
      JSON.stringify(orders)
    );
  }, [orders]);

  // ===============================
  // SAVE PAYMENTS
  // ===============================

  useEffect(() => {
    localStorage.setItem(
      'sxh_payments',
      JSON.stringify(payments)
    );
  }, [payments]);

  // ===============================
  // CREATE ORDER + TELEGRAM ALERT
  // ===============================

  const handleCreateOrder = async (
    order: Order
  ) => {
    // Save order
    setOrders((previousOrders) => [
      order,
      ...previousOrders,
    ]);

    // Telegram message
    const message = `
🚨 NEW ORDER RECEIVED

🆔 Order ID: ${order.id}

📦 Service:
${order.serviceName}

🔗 Link:
${order.link}

💰 Amount:
৳${order.charge}

📊 Status:
${order.status}

🌐 SocialHubX BD
`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      const result =
        await response.json();

      if (result.ok) {
        console.log(
          'Telegram notification sent!'
        );
      } else {
        console.error(
          'Telegram notification failed:',
          result
        );
      }
    } catch (error) {
      console.error(
        'Telegram connection error:',
        error
      );
    }

    // Open payment page
    setView('pay');
  };

  // ===============================
  // CREATE PAYMENT
  // ===============================

  const handleCreatePayment = (
    payment: PaymentRequest
  ) => {
    setPayments(
      (previousPayments) => [
        payment,
        ...previousPayments,
      ]
    );

    setView('my-orders');
  };

  // ===============================
  // BUY SERVICE
  // ===============================

  const openBuyNow = (
    service: Service
  ) => {
    setSelectedService(service);

    setView('home');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="flex flex-col min-h-screen">

      <Header
        setView={setView}
        isAdmin={isAdmin}
        currentView={view}
      />

      <main className="flex-grow container mx-auto px-4 py-8">

        {view === 'admin' ? (

          <AdminDashboard
            services={services}
            setServices={setServices}
            orders={orders}
            setOrders={setOrders}
            payments={payments}
            setPayments={setPayments}
            onLogout={() => {
              setIsAdmin(false);
              setView('home');
            }}
          />

        ) : (

          <div className="max-w-6xl mx-auto space-y-8">

            {view === 'home' && (

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1 space-y-6">

                  <OrderForm
                    service={selectedService}
                    onSubmit={
                      handleCreateOrder
                    }
                    services={services}
                  />

                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">

                    <h3 className="text-xl font-semibold mb-4 text-blue-400">
                      Why choose us?
                    </h3>

                    <ul className="space-y-3 text-slate-400">

                      <li className="flex items-start gap-2">

                        <span className="text-green-500 mt-1">
                          ✓
                        </span>

                        Instant order processing

                      </li>

                      <li className="flex items-start gap-2">

                        <span className="text-green-500 mt-1">
                          ✓
                        </span>

                        Real & Active profiles

                      </li>

                      <li className="flex items-start gap-2">

                        <span className="text-green-500 mt-1">
                          ✓
                        </span>

                        Cheapest in Bangladesh

                      </li>

                    </ul>

                  </div>

                </div>

                <div className="lg:col-span-2">

                  <ServiceList
                    services={services}
                    onBuy={openBuyNow}
                  />

                </div>

              </div>

            )}

            {view === 'pay' && (

              <div className="max-w-xl mx-auto">

                <PaymentForm
                  onSubmit={
                    handleCreatePayment
                  }
                />

              </div>

            )}

            {view === 'my-orders' && (

              <UserOrders
                orders={orders}
                payments={payments}
              />

            )}

          </div>

        )}

      </main>

      {/* FLOATING WHATSAPP */}

      <a
        href={`https://wa.me/${SUPPORT_NUMBER.replace(
          '+',
          ''
        )}`}

        target="_blank"

        rel="noopener noreferrer"

        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >

          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 1 2 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />

        </svg>

      </a>

      <Footer
        onAdminLink={() => {
          setIsAdmin(true);
          setView('admin');
        }}
      />

    </div>
  );
};

export default App;

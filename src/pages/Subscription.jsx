import { useState, useEffect } from 'react';
import { getSubscriptionStatus, createCheckout, cancelSubscription } from '../api/subscriptionApi';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaCrown, FaCheck } from 'react-icons/fa';
import { SUBSCRIPTION_PLANS } from '../utils/constants';

const Subscription = () => {
    const { user, updateUser } = useAuth();
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadSubscriptionStatus();
    }, []);

    const loadSubscriptionStatus = async () => {
        try {
            setLoading(true);
            const data = await getSubscriptionStatus();
            setSubscriptionStatus(data);
        } catch (err) {
            // User may not have a subscription yet
            setSubscriptionStatus(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (plan) => {
        try {
            setActionLoading(true);
            setError('');
            const response = await createCheckout(plan);

            // Redirect to Stripe checkout
            if (response.checkoutUrl) {
                window.location.href = response.checkoutUrl;
            } else {
                setError('Failed to create checkout session');
            }
        } catch (err) {
            setError(err.message || 'Failed to start subscription');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel your subscription? You will have access until the end of your billing period.')) {
            return;
        }

        try {
            setActionLoading(true);
            setError('');
            await cancelSubscription();
            await loadSubscriptionStatus();
            alert('Subscription canceled successfully');
        } catch (err) {
            setError(err.message || 'Failed to cancel subscription');
        } finally {
            setActionLoading(false);
        }
    };

    const proFeatures = [
        'Unlimited diary entries',
        'Advanced statistics and insights',
        'Custom tags and categories',
        'Export your data',
        'Priority support',
        'Early access to new features',
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner text="Loading subscription info..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <FaCrown className="text-6xl text-accent-orange mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-text-primary mb-4">
                        Go Pro
                    </h1>
                    <p className="text-xl text-text-secondary">
                        Unlock premium features and get the most out of Food Diary
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {/* Current Subscription Status */}
                {user?.isPro && subscriptionStatus && (
                    <div className="card mb-8 bg-gradient-to-r from-accent-green/10 to-accent-orange/10 border-accent-green">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">
                            Your Pro Subscription
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-text-secondary text-sm">Plan</p>
                                <p className="text-text-primary font-semibold">{subscriptionStatus.plan}</p>
                            </div>
                            <div>
                                <p className="text-text-secondary text-sm">Status</p>
                                <p className="text-accent-green font-semibold">{subscriptionStatus.status}</p>
                            </div>
                            {subscriptionStatus.currentPeriodEnd && (
                                <div>
                                    <p className="text-text-secondary text-sm">Next Billing Date</p>
                                    <p className="text-text-primary font-semibold">
                                        {new Date(subscriptionStatus.currentPeriodEnd).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                        {subscriptionStatus.canCancel && (
                            <button
                                onClick={handleCancel}
                                disabled={actionLoading}
                                className="btn-danger"
                            >
                                {actionLoading ? 'Canceling...' : 'Cancel Subscription'}
                            </button>
                        )}
                    </div>
                )}

                {/* Pro Features */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                        Pro Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {proFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <FaCheck className="text-accent-green flex-shrink-0" />
                                <span className="text-text-primary">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing Plans */}
                {!user?.isPro && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Monthly Plan */}
                        <div className="card border-2 border-border-color hover:border-accent-green transition-colors">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-text-primary mb-2">Monthly</h3>
                                <div className="text-4xl font-bold text-accent-green mb-2">
                                    $9.99<span className="text-lg text-text-secondary">/month</span>
                                </div>
                                <p className="text-text-secondary">Billed monthly</p>
                            </div>
                            <button
                                onClick={() => handleSubscribe(SUBSCRIPTION_PLANS.MONTHLY)}
                                disabled={actionLoading}
                                className="w-full btn-primary disabled:opacity-50"
                            >
                                {actionLoading ? 'Processing...' : 'Subscribe Monthly'}
                            </button>
                        </div>

                        {/* Yearly Plan */}
                        <div className="card border-2 border-accent-orange bg-gradient-to-br from-accent-orange/5 to-transparent">
                            <div className="inline-block bg-accent-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                BEST VALUE
                            </div>
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-text-primary mb-2">Yearly</h3>
                                <div className="text-4xl font-bold text-accent-orange mb-2">
                                    $99.99<span className="text-lg text-text-secondary">/year</span>
                                </div>
                                <p className="text-accent-green font-semibold">Save $20/year</p>
                            </div>
                            <button
                                onClick={() => handleSubscribe(SUBSCRIPTION_PLANS.YEARLY)}
                                disabled={actionLoading}
                                className="w-full bg-accent-orange hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                            >
                                {actionLoading ? 'Processing...' : 'Subscribe Yearly'}
                            </button>
                        </div>
                    </div>
                )}

                {/* FAQ */}
                <div className="mt-12 card">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-text-primary mb-1">Can I cancel anytime?</h3>
                            <p className="text-text-secondary text-sm">
                                Yes, you can cancel your subscription at any time. You'll retain Pro access until the end of your billing period.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text-primary mb-1">What payment methods do you accept?</h3>
                            <p className="text-text-secondary text-sm">
                                We accept all major credit cards through our secure payment processor, Stripe.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text-primary mb-1">Do you offer refunds?</h3>
                            <p className="text-text-secondary text-sm">
                                We offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;

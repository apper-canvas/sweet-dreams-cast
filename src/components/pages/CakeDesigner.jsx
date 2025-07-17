import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { useCart } from "@/hooks/CartProvider";

const CakeDesigner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [design, setDesign] = useState({
    size: "",
    layers: 1,
    shape: "Round",
    flavor: "",
    frosting: "",
    filling: "",
    decorations: [],
    colors: [],
    customText: "",
    specialRequests: "",
    occasion: ""
  });
  const { addToCart } = useCart();

  const steps = [
    "Size & Shape",
    "Flavors",
    "Decorations",
    "Personalization",
    "Review"
  ];

  const sizes = [
    { name: "6 inch", serves: "6-8 people", price: 65 },
    { name: "8 inch", serves: "12-15 people", price: 85 },
    { name: "10 inch", serves: "20-25 people", price: 110 },
    { name: "12 inch", serves: "30-35 people", price: 135 }
  ];

  const flavors = [
    "Vanilla", "Chocolate", "Strawberry", "Red Velvet", "Lemon", "Carrot",
    "Funfetti", "Banana", "Coconut", "Almond"
  ];

  const frostings = [
    "Vanilla Buttercream", "Chocolate Buttercream", "Cream Cheese",
    "Whipped Cream", "Caramel", "Peanut Butter"
  ];

  const fillings = [
    "None", "Strawberry Jam", "Chocolate Ganache", "Lemon Curd",
    "Raspberry Filling", "Caramel Sauce"
  ];

  const decorationOptions = [
    "Fresh Flowers", "Sugar Flowers", "Chocolate Drip", "Gold Accents",
    "Pearls", "Sprinkles", "Fruit", "Macarons"
  ];

  const colorOptions = [
    "White", "Pink", "Blue", "Purple", "Yellow", "Green", "Red", "Gold"
  ];

  const calculatePrice = () => {
    const sizePrice = sizes.find(s => s.name === design.size)?.price || 0;
    const decorationPrice = design.decorations.length * 15;
    const customTextPrice = design.customText ? 10 : 0;
    return sizePrice + decorationPrice + customTextPrice;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDecorationToggle = (decoration) => {
    setDesign(prev => ({
      ...prev,
      decorations: prev.decorations.includes(decoration)
        ? prev.decorations.filter(d => d !== decoration)
        : [...prev.decorations, decoration]
    }));
  };

  const handleColorToggle = (color) => {
    setDesign(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleAddToCart = () => {
    const customCake = {
      Id: Date.now(),
      name: "Custom Designed Cake",
      category: "Custom Orders",
      basePrice: calculatePrice(),
      images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"],
      customizable: true,
      leadTime: 7
    };

    addToCart(customCake, design, 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setDesign(prev => ({ ...prev, size: size.name }))}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      design.size === size.name
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{size.name}</div>
                        <div className="text-sm text-gray-600">{size.serves}</div>
                      </div>
                      <div className="font-semibold text-primary">
                        ${size.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Layers</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setDesign(prev => ({ ...prev, layers: Math.max(1, prev.layers - 1) }))}
                  className="w-12 h-12 p-0"
                >
                  <ApperIcon name="Minus" size={16} />
                </Button>
                <span className="text-2xl font-semibold w-12 text-center">
                  {design.layers}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setDesign(prev => ({ ...prev, layers: Math.min(5, prev.layers + 1) }))}
                  className="w-12 h-12 p-0"
                >
                  <ApperIcon name="Plus" size={16} />
                </Button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cake Flavor</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {flavors.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setDesign(prev => ({ ...prev, flavor }))}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      design.flavor === flavor
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frosting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {frostings.map((frosting) => (
                  <button
                    key={frosting}
                    onClick={() => setDesign(prev => ({ ...prev, frosting }))}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      design.frosting === frosting
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {frosting}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filling (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fillings.map((filling) => (
                  <button
                    key={filling}
                    onClick={() => setDesign(prev => ({ ...prev, filling }))}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      design.filling === filling
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {filling}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Decorations (+$15 each)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {decorationOptions.map((decoration) => (
                  <button
                    key={decoration}
                    onClick={() => handleDecorationToggle(decoration)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      design.decorations.includes(decoration)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {decoration}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorToggle(color)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      design.colors.includes(color)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="customText">Custom Text (+$10)</Label>
              <Input
                id="customText"
                placeholder="Happy Birthday, Congratulations, etc."
                value={design.customText}
                onChange={(e) => setDesign(prev => ({ ...prev, customText: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="occasion">Occasion</Label>
              <Input
                id="occasion"
                placeholder="Birthday, Wedding, Anniversary, etc."
                value={design.occasion}
                onChange={(e) => setDesign(prev => ({ ...prev, occasion: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <textarea
                id="specialRequests"
                rows={4}
                placeholder="Any special instructions or requests..."
                value={design.specialRequests}
                onChange={(e) => setDesign(prev => ({ ...prev, specialRequests: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Design</h3>
            
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Cake Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">{design.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Layers:</span>
                      <span className="font-medium">{design.layers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flavor:</span>
                      <span className="font-medium">{design.flavor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frosting:</span>
                      <span className="font-medium">{design.frosting}</span>
                    </div>
                    {design.filling && (
                      <div className="flex justify-between">
                        <span>Filling:</span>
                        <span className="font-medium">{design.filling}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Decorations & Extras</h4>
                  <div className="space-y-2 text-sm">
                    {design.decorations.length > 0 && (
                      <div>
                        <span className="font-medium">Decorations:</span>
                        <div className="mt-1">
                          {design.decorations.map(decoration => (
                            <span key={decoration} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1 mb-1">
                              {decoration}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {design.colors.length > 0 && (
                      <div>
                        <span className="font-medium">Colors:</span>
                        <div className="mt-1">
                          {design.colors.map(color => (
                            <span key={color} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1 mb-1">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {design.customText && (
                      <div className="flex justify-between">
                        <span>Custom Text:</span>
                        <span className="font-medium">"{design.customText}"</span>
                      </div>
                    )}
                    
                    {design.occasion && (
                      <div className="flex justify-between">
                        <span>Occasion:</span>
                        <span className="font-medium">{design.occasion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {design.specialRequests && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600">{design.specialRequests}</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                  <span className="text-3xl font-bold text-primary">${calculatePrice()}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Lead time: 7 days for custom orders
                </p>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Custom Cake Designer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your perfect cake with our step-by-step designer tool
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index <= currentStep ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {steps[currentStep]}
          </h2>
          {renderStep()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            Back
          </Button>

          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              Total: ${calculatePrice()}
            </div>
            <div className="text-sm text-gray-600">
              Lead time: 7 days
            </div>
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !design.size) ||
                (currentStep === 1 && (!design.flavor || !design.frosting))
              }
              className="flex items-center"
            >
              Next
              <ApperIcon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="flex items-center"
            >
              <ApperIcon name="ShoppingCart" size={16} className="mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeDesigner;
//+------------------------------------------------------------------+
//|                                                    Blau_MACD.mq5 |
//|                        Copyright 2011, MetaQuotes Software Corp. |
//|                                              http://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2011, MetaQuotes Software Corp." // copyright
#property link      "http://www.mql5.com"                       // url
#property description "Moving Average Convergence/Divergence, MACD (William Blau)" // description
#include <WilliamBlau.mqh>              // include file (terminal_data_folder\MQL5\Include)
//--- indicator settings
#property indicator_separate_window     // indicator in a separate window
#property indicator_buffers 6           // number of indicator buffers used
#property indicator_plots   3           // number of plots
//--- graphic plot #0 (Main)
#property indicator_label1  "Histogram"      // label of graphic plot #0
#property indicator_type1   DRAW_HISTOGRAM // draw as a histogram
#property indicator_color1  Red         // histogram color
#property indicator_style1  STYLE_SOLID    // histogram style
#property indicator_width1  2              // histogram width
//--- graphic plot #1 (Signal Line)
#property indicator_label2  "MACD"       // label of graphic plot #1
#property indicator_type2   DRAW_LINE      // draw as a line
#property indicator_color2  Blue            // line color
#property indicator_style2  STYLE_SOLID    // line style
#property indicator_width2  1              // line width
//--- graphic plot #1 (Signal Line)
#property indicator_label3  "Signal"       // label of graphic plot #1
#property indicator_type3   DRAW_LINE      // draw as a line
#property indicator_color3  Red            // line color
#property indicator_style3  STYLE_SOLID    // line style
#property indicator_width3  1              // line width
//--- input parameters
input int    s=12;  // s - 1st EMA (Fast), applied to price
input int    r=26; // r - 2nd EMA (Slow), applied to price
input int    u=9;  // u - SMA, applied to MACD
input ENUM_APPLIED_PRICE AppliedPrice=PRICE_CLOSE; // AppliedPrice - price type
//--- dynamic arrays
double MainBuffer[];       // u-period SMA (graphic plot #0)
double PriceBuffer[];      // price array
double EMA1_PriceBuffer[]; // r-period 1st EMA (applied to price)
double EMA2_PriceBuffer[]; // s-period 2nd EMA (applied to price)
double MACDBuffer[];       // MACD array
double HistogramBuffer[];       // Histogram array
//--- global variables
int    begin1, begin2, begin3, begin4; // starting index
int    rates_total_min; // rates total min
//+------------------------------------------------------------------+
//| Custom indicator initialization function                         |
//+------------------------------------------------------------------+
int OnInit()
  {
//--- indicator buffers
   // graphic plot #0
   SetIndexBuffer(0,HistogramBuffer,INDICATOR_DATA);               // Histogram
   SetIndexBuffer(1,MACDBuffer,INDICATOR_DATA);       // moving averages convergence/divergence
   SetIndexBuffer(2,MainBuffer,INDICATOR_DATA);       // Signal (u-period SMA)
   // buffers for intermediate calculations
   SetIndexBuffer(3,PriceBuffer,INDICATOR_CALCULATIONS);      // price buffer
   SetIndexBuffer(4,EMA1_PriceBuffer,INDICATOR_CALCULATIONS); // r-period 1st EMA (slow) (applied to price)
   SetIndexBuffer(5,EMA2_PriceBuffer,INDICATOR_CALCULATIONS); // s-period 2nd EMA (fast) (applied to price)
/*
//--- graphic plot #0 (Main)
   PlotIndexSetString(0,PLOT_LABEL,"MACD");            // graphic plot #0 label
   PlotIndexSetInteger(0,PLOT_DRAW_TYPE,DRAW_LINE);    // draw as a line
   PlotIndexSetInteger(0,PLOT_LINE_COLOR,Blue);        // line color
   PlotIndexSetInteger(0,PLOT_LINE_STYLE,STYLE_SOLID); // line style
   PlotIndexSetInteger(0,PLOT_LINE_WIDTH,1);           // line width
*/
//--- precision
   IndicatorSetInteger(INDICATOR_DIGITS,_Digits);
//---
   begin1=0;                     
   begin2=begin1+MathMax(r,s)-1; // or =(max(r,s)-1)       - MACDBuffer[], EMA1_PriceBuffer[]
   begin3=begin2;                // or =(max(r,s)-1)       - EMA2_PriceBuffer[]
   begin4=begin3+u-1;            // or =(max(r,s)-1)+(u-1) - MainBuffer[]
   //
   rates_total_min=begin4+1; // rates total min
//--- starting bar index for plot #0
   PlotIndexSetInteger(0,PLOT_DRAW_BEGIN,begin4);
//--- short indicator name
   string shortname=string(s)+","+string(r)+","+string(u);
   IndicatorSetString(INDICATOR_SHORTNAME,"Blau_MACD("+shortname+")");
//--- OnInit done
   return(0);
  }
//+------------------------------------------------------------------+
//| Custom indicator iteration function                              |
//+------------------------------------------------------------------+
int OnCalculate(
                const int rates_total,     // rates total
                const int prev_calculated, // bars, calculated at previous call
                const datetime &Time[],    // Time
                const double &Open[],      // Open
                const double &High[],      // High
                const double &Low[],       // Low
                const double &Close[],     // Close
                const long &TickVolume[],  // Tick Volume
                const long &Volume[],      // Real Volume
                const int &Spread[]        // Spread
               )
  {
   int i,pos;
//--- check rates
   if(rates_total<rates_total_min) return(0);
//--- calculation of PriceBuffer[]
   CalculatePriceBuffer(
                        AppliedPrice,        // applied price
                        rates_total,         // rates total
                        prev_calculated,     // bars, calculated at previous call
                        Open,High,Low,Close, // Open[], High[], Low[], Close[]
                        PriceBuffer          // target array
                       );
//--- calculation of moving averages convergence/divergence
   if(prev_calculated==0)      // at first call
     {
      pos=begin2;              // 
      for(i=0;i<pos;i++)       // pos values
         MACDBuffer[i]=0.0;    // zero values
     }
   else pos=prev_calculated-1; // overwise recalculate only last value
   // r-period 1st EMA: calculation of EMA1_PriceBuffer[]
   ExponentialMAOnBufferWB(rates_total,prev_calculated,begin1,r,PriceBuffer,EMA1_PriceBuffer);
   // s-period 2nd EMA: calculation of EMA2_PriceBuffer[]
   ExponentialMAOnBufferWB(rates_total,prev_calculated,begin1,s,PriceBuffer,EMA2_PriceBuffer);
   // calculation of MACDBuffer[]
   for(i=pos;i<rates_total;i++)
      MACDBuffer[i]=EMA2_PriceBuffer[i]-EMA1_PriceBuffer[i];
//--- EMA smoothing
   // u-period SMA (graphic plot #0)
   SimpleMAOnBufferWB(
                           rates_total,     // rates total
                           prev_calculated, // bars, calculated at previous call
                           begin3,          // starting index
                           u,               // smoothing period
                           MACDBuffer,      // input array
                           MainBuffer       // target array
                          );
   
   for(i=0;i<u + r - 2;i++)
      MainBuffer[i]=0;
   
   for(i=0;i<rates_total;i++)
      HistogramBuffer[i]=MACDBuffer[i]-MainBuffer[i];

//--- OnCalculate done. Return value of prev_calculated for next call
   return(rates_total);
  }
//+------------------------------------------------------------------+

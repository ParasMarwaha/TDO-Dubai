"use strict";
(self.webpackChunk_coreui_coreui_free_react_admin_template = self.webpackChunk_coreui_coreui_free_react_admin_template || []).push([[8386], {
    78386: (e, i, l) => {
        l.r(i), l.d(i, {default: () => c});
        var s = l(72791), a = l(78983), d = l(18018), t = l(80184);
        const r = () => {
            const [e, i] = (0, s.useState)(!1);
            return (0, t.jsxs)(a.lx, {
                className: "row g-3 needs-validation",
                noValidate: !0,
                validated: e,
                onSubmit: e => {
                    !1 === e.currentTarget.checkValidity() && (e.preventDefault(), e.stopPropagation()), i(!0)
                },
                children: [(0, t.jsxs)(a.b7, {
                    md: 4,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationCustom01",
                        children: "Email"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationCustom01",
                        defaultValue: "Mark",
                        required: !0
                    }), (0, t.jsx)(a.CO, {valid: !0, children: "Looks good!"})]
                }), (0, t.jsxs)(a.b7, {
                    md: 4,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationCustom02",
                        children: "Email"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationCustom02",
                        defaultValue: "Otto",
                        required: !0
                    }), (0, t.jsx)(a.CO, {valid: !0, children: "Looks good!"})]
                }), (0, t.jsxs)(a.b7, {
                    md: 4,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationCustomUsername",
                        children: "Username"
                    }), (0, t.jsxs)(a.YR, {
                        className: "has-validation",
                        children: [(0, t.jsx)(a.wV, {
                            id: "inputGroupPrepend",
                            children: "@"
                        }), (0, t.jsx)(a.jO, {
                            type: "text",
                            id: "validationCustomUsername",
                            defaultValue: "",
                            "aria-describedby": "inputGroupPrepend",
                            required: !0
                        }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please choose a username."})]
                    })]
                }), (0, t.jsxs)(a.b7, {
                    md: 6,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationCustom03",
                        children: "City"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationCustom03",
                        required: !0
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid city."})]
                }), (0, t.jsxs)(a.b7, {
                    md: 3,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationCustom04",
                        children: "City"
                    }), (0, t.jsxs)(a.LX, {
                        id: "validationCustom04",
                        children: [(0, t.jsx)("option", {
                            disabled: !0,
                            children: "Choose..."
                        }), (0, t.jsx)("option", {children: "..."})]
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid city."})]
                }), (0, t.jsxs)(a.b7, {
                    md: 3,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationCustom05",
                        children: "City"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationCustom05",
                        required: !0
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid zip."})]
                }), (0, t.jsxs)(a.b7, {
                    xs: 12,
                    children: [(0, t.jsx)(a.EC, {
                        type: "checkbox",
                        id: "invalidCheck",
                        label: "Agree to terms and conditions",
                        required: !0
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "You must agree before submitting."})]
                }), (0, t.jsx)(a.b7, {
                    xs: 12,
                    children: (0, t.jsx)(a.u5, {color: "primary", type: "submit", children: "Submit form"})
                })]
            })
        }, o = () => {
            const [e, i] = (0, s.useState)(!1);
            return (0, t.jsxs)(a.lx, {
                className: "row g-3 needs-validation",
                validated: e,
                onSubmit: e => {
                    !1 === e.currentTarget.checkValidity() && (e.preventDefault(), e.stopPropagation()), i(!0)
                },
                children: [(0, t.jsxs)(a.b7, {
                    md: 4,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationDefault01",
                        children: "Email"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationDefault01",
                        defaultValue: "Mark",
                        required: !0
                    }), (0, t.jsx)(a.CO, {valid: !0, children: "Looks good!"})]
                }), (0, t.jsxs)(a.b7, {
                    md: 4,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationDefault02",
                        children: "Email"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationDefault02",
                        defaultValue: "Otto",
                        required: !0
                    }), (0, t.jsx)(a.CO, {valid: !0, children: "Looks good!"})]
                }), (0, t.jsxs)(a.b7, {
                    md: 4,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationDefaultUsername",
                        children: "Username"
                    }), (0, t.jsxs)(a.YR, {
                        className: "has-validation",
                        children: [(0, t.jsx)(a.wV, {
                            id: "inputGroupPrepend02",
                            children: "@"
                        }), (0, t.jsx)(a.jO, {
                            type: "text",
                            id: "validationDefaultUsername",
                            defaultValue: "",
                            "aria-describedby": "inputGroupPrepend02",
                            required: !0
                        }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please choose a username."})]
                    })]
                }), (0, t.jsxs)(a.b7, {
                    md: 6,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationDefault03",
                        children: "City"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationDefault03",
                        required: !0
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid city."})]
                }), (0, t.jsxs)(a.b7, {
                    md: 3,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationDefault04",
                        children: "City"
                    }), (0, t.jsxs)(a.LX, {
                        id: "validationDefault04",
                        children: [(0, t.jsx)("option", {
                            disabled: !0,
                            children: "Choose..."
                        }), (0, t.jsx)("option", {children: "..."})]
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid city."})]
                }), (0, t.jsxs)(a.b7, {
                    md: 3,
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationDefault05",
                        children: "City"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationDefault05",
                        required: !0
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid zip."})]
                }), (0, t.jsxs)(a.b7, {
                    xs: 12,
                    children: [(0, t.jsx)(a.EC, {
                        type: "checkbox",
                        id: "invalidCheck",
                        label: "Agree to terms and conditions",
                        required: !0
                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "You must agree before submitting."})]
                }), (0, t.jsx)(a.b7, {
                    xs: 12,
                    children: (0, t.jsx)(a.u5, {color: "primary", type: "submit", children: "Submit form"})
                })]
            })
        }, n = () => {
            const [e, i] = (0, s.useState)(!1);
            return (0, t.jsxs)(a.lx, {
                className: "row g-3 needs-validation",
                noValidate: !0,
                validated: e,
                onSubmit: e => {
                    !1 === e.currentTarget.checkValidity() && (e.preventDefault(), e.stopPropagation()), i(!0)
                },
                children: [(0, t.jsxs)(a.b7, {
                    md: 4,
                    className: "position-relative",
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationTooltip01",
                        children: "Email"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationTooltip01",
                        defaultValue: "Mark",
                        required: !0
                    }), (0, t.jsx)(a.CO, {tooltip: !0, valid: !0, children: "Looks good!"})]
                }), (0, t.jsxs)(a.b7, {
                    md: 4,
                    className: "position-relative",
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationTooltip02",
                        children: "Email"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationTooltip02",
                        defaultValue: "Otto",
                        required: !0
                    }), (0, t.jsx)(a.CO, {tooltip: !0, valid: !0, children: "Looks good!"})]
                }), (0, t.jsxs)(a.b7, {
                    md: 4,
                    className: "position-relative",
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationTooltipUsername",
                        children: "Username"
                    }), (0, t.jsxs)(a.YR, {
                        className: "has-validation",
                        children: [(0, t.jsx)(a.wV, {
                            id: "inputGroupPrepend",
                            children: "@"
                        }), (0, t.jsx)(a.jO, {
                            type: "text",
                            id: "validationTooltipUsername",
                            defaultValue: "",
                            "aria-describedby": "inputGroupPrepend",
                            required: !0
                        }), (0, t.jsx)(a.CO, {tooltip: !0, invalid: !0, children: "Please choose a username."})]
                    })]
                }), (0, t.jsxs)(a.b7, {
                    md: 6,
                    className: "position-relative",
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationTooltip03",
                        children: "City"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationTooltip03",
                        required: !0
                    }), (0, t.jsx)(a.CO, {tooltip: !0, invalid: !0, children: "Please provide a valid city."})]
                }), (0, t.jsxs)(a.b7, {
                    md: 3,
                    className: "position-relative",
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationTooltip04",
                        children: "City"
                    }), (0, t.jsxs)(a.LX, {
                        id: "validationTooltip04",
                        required: !0,
                        children: [(0, t.jsx)("option", {
                            disabled: !0,
                            defaultValue: "",
                            children: "Choose..."
                        }), (0, t.jsx)("option", {children: "..."})]
                    }), (0, t.jsx)(a.CO, {tooltip: !0, invalid: !0, children: "Please provide a valid city."})]
                }), (0, t.jsxs)(a.b7, {
                    md: 3,
                    className: "position-relative",
                    children: [(0, t.jsx)(a.L8, {
                        htmlFor: "validationTooltip05",
                        children: "City"
                    }), (0, t.jsx)(a.jO, {
                        type: "text",
                        id: "validationTooltip05",
                        required: !0
                    }), (0, t.jsx)(a.CO, {tooltip: !0, invalid: !0, children: "Please provide a valid zip."})]
                }), (0, t.jsx)(a.b7, {
                    xs: 12,
                    className: "position-relative",
                    children: (0, t.jsx)(a.u5, {color: "primary", type: "submit", children: "Submit form"})
                })]
            })
        }, c = () => (0, t.jsxs)(a.rb, {
            children: [(0, t.jsx)(a.b7, {
                xs: 12, children: (0, t.jsxs)(a.xH, {
                    className: "mb-4",
                    children: [(0, t.jsxs)(a.bn, {children: [(0, t.jsx)("strong", {children: "Validation"}), " ", (0, t.jsx)("small", {children: "Custom styles"})]}), (0, t.jsxs)(a.sl, {
                        children: [(0, t.jsxs)("p", {
                            className: "text-medium-emphasis small",
                            children: ["For custom CoreUI form validation messages, you'll need to add the", " ", (0, t.jsx)("code", {children: "noValidate"}), " boolean property to your ", (0, t.jsx)("code", {children: "<CForm>"}), ". This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript. Try to submit the form below; our JavaScript will intercept the submit button and relay feedback to you. When attempting to submit, you'll see the ", (0, t.jsx)("code", {children: ":invalid"}), " and ", (0, t.jsx)("code", {children: ":valid"}), " styles applied to your form controls."]
                        }), (0, t.jsxs)("p", {
                            className: "text-medium-emphasis small",
                            children: ["Custom feedback styles apply custom colors, borders, focus styles, and background icons to better communicate feedback.", " "]
                        }), (0, t.jsx)(d.q3, {href: "forms/validation", children: r()})]
                    })]
                })
            }), (0, t.jsx)(a.b7, {
                xs: 12,
                children: (0, t.jsxs)(a.xH, {
                    className: "mb-4",
                    children: [(0, t.jsxs)(a.bn, {children: [(0, t.jsx)("strong", {children: "Validation"}), " ", (0, t.jsx)("small", {children: "Browser defaults"})]}), (0, t.jsxs)(a.sl, {
                        children: [(0, t.jsx)("p", {
                            className: "text-medium-emphasis small",
                            children: "Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you'll see a slightly different style of feedback."
                        }), (0, t.jsx)("p", {
                            className: "text-medium-emphasis small",
                            children: "While these feedback styles cannot be styled with CSS, you can still customize the feedback text through JavaScript."
                        }), (0, t.jsx)(d.q3, {href: "forms/validation#browser-defaults", children: o()})]
                    })]
                })
            }), (0, t.jsx)(a.b7, {
                xs: 12, children: (0, t.jsxs)(a.xH, {
                    className: "mb-4",
                    children: [(0, t.jsxs)(a.bn, {children: [(0, t.jsx)("strong", {children: "Validation"}), " ", (0, t.jsx)("small", {children: "Server side"})]}), (0, t.jsxs)(a.sl, {
                        children: [(0, t.jsxs)("p", {
                            className: "text-medium-emphasis small",
                            children: ["We recommend using client-side validation, but in case you require server-side validation, you can indicate invalid and valid form fields with ", (0, t.jsx)("code", {children: "invalid"}), " ", "and ", (0, t.jsx)("code", {children: "valid"}), " boolean properties."]
                        }), (0, t.jsxs)("p", {
                            className: "text-medium-emphasis small",
                            children: ["For invalid fields, ensure that the invalid feedback/error message is associated with the relevant form field using ", (0, t.jsx)("code", {children: "aria-describedby"}), " (noting that this attribute allows more than one ", (0, t.jsx)("code", {children: "id"}), " to be referenced, in case the field already points to additional form text)."]
                        }), (0, t.jsx)(d.q3, {
                            href: "forms/validation#server-side", children: (0, t.jsxs)(a.lx, {
                                className: "row g-3 needs-validation",
                                children: [(0, t.jsxs)(a.b7, {
                                    md: 4,
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationServer01",
                                        children: "Email"
                                    }), (0, t.jsx)(a.jO, {
                                        type: "text",
                                        id: "validationServer01",
                                        defaultValue: "Mark",
                                        valid: !0,
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {valid: !0, children: "Looks good!"})]
                                }), (0, t.jsxs)(a.b7, {
                                    md: 4,
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationServer02",
                                        children: "Email"
                                    }), (0, t.jsx)(a.jO, {
                                        type: "text",
                                        id: "validationServer02",
                                        defaultValue: "Otto",
                                        valid: !0,
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {valid: !0, children: "Looks good!"})]
                                }), (0, t.jsxs)(a.b7, {
                                    md: 4,
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationServerUsername",
                                        children: "Username"
                                    }), (0, t.jsxs)(a.YR, {
                                        className: "has-validation",
                                        children: [(0, t.jsx)(a.wV, {
                                            id: "inputGroupPrepend03",
                                            children: "@"
                                        }), (0, t.jsx)(a.jO, {
                                            type: "text",
                                            id: "validationServerUsername",
                                            defaultValue: "",
                                            "aria-describedby": "inputGroupPrepend03",
                                            invalid: !0,
                                            required: !0
                                        }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please choose a username."})]
                                    })]
                                }), (0, t.jsxs)(a.b7, {
                                    md: 6,
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationServer03",
                                        children: "City"
                                    }), (0, t.jsx)(a.jO, {
                                        type: "text",
                                        id: "validationServer03",
                                        invalid: !0,
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid city."})]
                                }), (0, t.jsxs)(a.b7, {
                                    md: 3,
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationServer04",
                                        children: "City"
                                    }), (0, t.jsxs)(a.LX, {
                                        id: "validationServer04",
                                        invalid: !0,
                                        children: [(0, t.jsx)("option", {
                                            disabled: !0,
                                            children: "Choose..."
                                        }), (0, t.jsx)("option", {children: "..."})]
                                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid city."})]
                                }), (0, t.jsxs)(a.b7, {
                                    md: 3,
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationServer05",
                                        children: "City"
                                    }), (0, t.jsx)(a.jO, {
                                        type: "text",
                                        id: "validationServer05",
                                        invalid: !0,
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Please provide a valid zip."})]
                                }), (0, t.jsxs)(a.b7, {
                                    xs: 12,
                                    children: [(0, t.jsx)(a.EC, {
                                        type: "checkbox",
                                        id: "invalidCheck",
                                        label: "Agree to terms and conditions",
                                        invalid: !0,
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "You must agree before submitting."})]
                                }), (0, t.jsx)(a.b7, {
                                    xs: 12,
                                    children: (0, t.jsx)(a.u5, {
                                        color: "primary",
                                        type: "submit",
                                        children: "Submit form"
                                    })
                                })]
                            })
                        })]
                    })]
                })
            }), (0, t.jsx)(a.b7, {
                xs: 12, children: (0, t.jsxs)(a.xH, {
                    className: "mb-4",
                    children: [(0, t.jsxs)(a.bn, {children: [(0, t.jsx)("strong", {children: "Validation"}), " ", (0, t.jsx)("small", {children: "Supported elements"})]}), (0, t.jsxs)(a.sl, {
                        children: [(0, t.jsx)("p", {
                            className: "text-medium-emphasis small",
                            children: "Validation styles are available for the following form controls and components:"
                        }), (0, t.jsxs)("ul", {children: [(0, t.jsxs)("li", {children: [(0, t.jsx)("code", {children: "<CFormInput>"}), "s"]}), (0, t.jsxs)("li", {children: [(0, t.jsx)("code", {children: "<CFormSelect>"}), "s"]}), (0, t.jsxs)("li", {children: [(0, t.jsx)("code", {children: "<CFormCheck>"}), "s"]})]}), (0, t.jsx)(d.q3, {
                            href: "forms/validation#supported-elements", children: (0, t.jsxs)(a.lx, {
                                validated: !0,
                                children: [(0, t.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, t.jsx)(a.L8, {
                                        htmlFor: "validationTextarea",
                                        className: "form-label",
                                        children: "Textarea"
                                    }), (0, t.jsx)(a.PB, {
                                        id: "validationTextarea",
                                        placeholder: "Required example textarea",
                                        invalid: !0,
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {
                                        invalid: !0,
                                        children: "Please enter a message in the textarea."
                                    })]
                                }), (0, t.jsx)(a.EC, {
                                    className: "mb-3",
                                    id: "validationFormCheck1",
                                    label: "Check this checkbox",
                                    required: !0
                                }), (0, t.jsx)(a.CO, {
                                    invalid: !0,
                                    children: "Example invalid feedback text"
                                }), (0, t.jsx)(a.EC, {
                                    type: "radio",
                                    name: "radio-stacked",
                                    id: "validationFormCheck2",
                                    label: "Check this checkbox",
                                    required: !0
                                }), (0, t.jsx)(a.EC, {
                                    className: "mb-3",
                                    type: "radio",
                                    name: "radio-stacked",
                                    id: "validationFormCheck3",
                                    label: "Or toggle this other radio",
                                    required: !0
                                }), (0, t.jsx)(a.CO, {
                                    invalid: !0,
                                    children: "More example invalid feedback text"
                                }), (0, t.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, t.jsxs)(a.LX, {
                                        required: !0,
                                        "aria-label": "select example",
                                        children: [(0, t.jsx)("option", {children: "Open this select menu"}), (0, t.jsx)("option", {
                                            value: "1",
                                            children: "One"
                                        }), (0, t.jsx)("option", {
                                            value: "2",
                                            children: "Two"
                                        }), (0, t.jsx)("option", {value: "3", children: "Three"})]
                                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Example invalid select feedback"})]
                                }), (0, t.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, t.jsx)(a.jO, {
                                        type: "file",
                                        id: "validationTextarea",
                                        "aria-label": "file example",
                                        required: !0
                                    }), (0, t.jsx)(a.CO, {invalid: !0, children: "Example invalid form file feedback"})]
                                }), (0, t.jsx)("div", {
                                    className: "mb-3",
                                    children: (0, t.jsx)(a.u5, {
                                        type: "submit",
                                        color: "primary",
                                        disabled: !0,
                                        children: "Submit form"
                                    })
                                })]
                            })
                        })]
                    })]
                })
            }), (0, t.jsx)(a.b7, {
                xs: 12,
                children: (0, t.jsxs)(a.xH, {
                    className: "mb-4",
                    children: [(0, t.jsxs)(a.bn, {children: [(0, t.jsx)("strong", {children: "Validation"}), " ", (0, t.jsx)("small", {children: "Tooltips"})]}), (0, t.jsxs)(a.sl, {
                        children: [(0, t.jsxs)("p", {
                            className: "text-medium-emphasis small",
                            children: ["If your form layout allows it, you can swap the text for the tooltip to display validation feedback in a styled tooltip. Be sure to have a parent with", " ", (0, t.jsx)("code", {children: "position: relative"}), " on it for tooltip positioning. In the example below, our column classes have this already, but your project may require an alternative setup."]
                        }), (0, t.jsx)(d.q3, {href: "forms/validation#tooltips", children: n()})]
                    })]
                })
            })]
        })
    }
}]);
//# sourceMappingURL=8386.051843a3.chunk.js.map